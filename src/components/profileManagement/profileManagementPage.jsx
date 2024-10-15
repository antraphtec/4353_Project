import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  FormHelperText,
} from '@mui/material';
import './profileManagement.css';

const states = [
  { code: 'TX', name: 'Texas' },
  { code: 'CA', name: 'California' },
  // Add more states as needed
];

const skillsList = [
  { id: '1', name: 'Teamwork' },
  { id: '2', name: 'Organization' },
  { id: '3', name: 'Tech Skills' }
  // Add more skills as needed
];

const ProfileManagement = ({ supabase, profileEmail = null, isAdmin = false }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: '',
      address1: '',
      city: '',
      state: '',
      zipcode: '',
      skills: [],
      availability: '',
    },
  });

  useEffect(() => {
    if (profileEmail) {
      // If profileEmail is provided, fetch the profile for that email (used by admins)
      fetchProfile(profileEmail);
      setLoading(false);
    } else {
      // Fetch session on mount for the logged-in user (used by volunteers themselves)
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        if (session) {
          fetchProfile(session.user.email);
        }
        setLoading(false);
      });
    }
  }, [supabase, profileEmail]);

  const fetchProfile = async (email) => {
    const { data, error } = await supabase
      .from('accounts')
      .select('*')
      .eq('email_address', email)
      .single();

    if (error) {
      console.log('Error fetching profile:', error);
    } else if (data) {
      setValue('fullName', data.fullName || '');
      setValue('address1', data.address1 || '');
      setValue('city', data.city || '');
      setValue('state', data.state || '');
      setValue('zipcode', data.zipcode || '');
      setValue('skills', data.skills || []);
      setValue(
        'availability',
        data.availability ? data.availability.join(', ') : ''
      );
    }
  };

  const handleProfileUpdate = async (formData) => {
    console.log('Form Data:', formData);

    const updatedSkills = formData.skills.length ? formData.skills : [];
    const updatedAvailability = formData.availability
      ? formData.availability.split(',').map((date) => date.trim())
      : [];

    const { data, error } = await supabase
      .from('accounts')
      .upsert(
        {
          email_address: profileEmail || session.user.email, // Use profileEmail if provided, otherwise current user email
          fullName: formData.fullName,
          address1: formData.address1,
          city: formData.city,
          state: formData.state,
          zipcode: formData.zipcode,
          skills: updatedSkills,
          availability: updatedAvailability,
        },
        { onConflict: 'email_address' }
      );

    if (error) {
      console.error('Error updating profile:', error);
    } else {
      console.log('Upsert successful:', data);
      alert('Profile updated successfully!');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="profile-management-container">
      <div className="profile-image">
        <img src="/images/profmanagementimg.png" alt="Profile Management Illustration" />
      </div>
      <div className="form-container">
        <h2>{isAdmin ? "Admin: Edit Volunteer Profile" : "Profile Management"}</h2>
        <form onSubmit={handleSubmit(handleProfileUpdate)}>
          {/* Full Name */}
          <Controller
            name="fullName"
            control={control}
            rules={{
              required: 'Full Name is required',
              maxLength: { value: 50, message: 'Max 50 characters' },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Full Name"
                fullWidth
                margin="normal"
                error={!!errors.fullName}
                helperText={errors.fullName ? errors.fullName.message : ''}
              />
            )}
          />

          {/* Address 1 */}
          <Controller
            name="address1"
            control={control}
            rules={{
              required: 'Address is required',
              maxLength: { value: 100, message: 'Max 100 characters' },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Address 1"
                fullWidth
                margin="normal"
                error={!!errors.address1}
                helperText={errors.address1 ? errors.address1.message : ''}
              />
            )}
          />

          {/* City */}
          <Controller
            name="city"
            control={control}
            rules={{
              required: 'City is required',
              maxLength: { value: 100, message: 'Max 100 characters' },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="City"
                fullWidth
                margin="normal"
                error={!!errors.city}
                helperText={errors.city ? errors.city.message : ''}
              />
            )}
          />

          {/* State */}
          <Controller
            name="state"
            control={control}
            rules={{ required: 'State is required' }}
            render={({ field }) => (
              <FormControl fullWidth margin="normal" error={!!errors.state}>
                <InputLabel>State</InputLabel>
                <Select
                  {...field}
                  value={field.value || ''}
                  onChange={(event) => field.onChange(event.target.value)}
                >
                  {states.map((state) => (
                    <MenuItem key={state.code} value={state.code}>
                      {state.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.state && (
                  <FormHelperText>{errors.state.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />

          {/* Zip Code */}
          <Controller
            name="zipcode"
            control={control}
            rules={{
              required: 'Zip code is required',
              minLength: { value: 5, message: 'At least 5 characters required' },
              maxLength: { value: 9, message: 'Max 9 characters' },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Zip Code"
                fullWidth
                margin="normal"
                error={!!errors.zipcode}
                helperText={errors.zipcode ? errors.zipcode.message : ''}
              />
            )}
          />

          {/* Skills */}
          <Controller
            name="skills"
            control={control}
            rules={{ required: 'Select at least one skill' }}
            render={({ field }) => (
              <FormControl fullWidth margin="normal" error={!!errors.skills}>
                <InputLabel>Skills</InputLabel>
                <Select
                  {...field}
                  multiple
                  value={field.value || []}
                  onChange={(event) => field.onChange(event.target.value)}
                >
                  {skillsList.map((skill) => (
                    <MenuItem key={skill.id} value={skill.id}>
                      {skill.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.skills && (
                  <FormHelperText>{errors.skills.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />

          {/* Availability */}
          <Controller
            name="availability"
            control={control}
            rules={{ required: 'Availability is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Availability"
                fullWidth
                margin="normal"
                placeholder="e.g. 2024-10-15, 2024-10-20"
                error={!!errors.availability}
                helperText={
                  errors.availability ? errors.availability.message : ''
                }
              />
            )}
          />

          <div className="button-group">
            <Button type="submit" variant="contained" color="primary">
              Confirm
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileManagement;
