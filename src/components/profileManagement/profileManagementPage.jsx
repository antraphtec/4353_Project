// src/components/profileManagement/profileManagementPage.jsx
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, MenuItem, FormControl, Select, InputLabel, FormHelperText } from '@mui/material';
import './profileManagement.css';

const states = [
  { code: 'TX', name: 'Texas' },
  { code: 'CA', name: 'California' },
  // Add more states as needed
];

const skills = [
  { id: 'js', name: 'JavaScript' },
  { id: 'react', name: 'React' },
  { id: 'node', name: 'Node.js' },
  // Add more skills as needed
];

const ProfileManagement = () => {
  const {
    handleSubmit,
    control,
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

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="profile-management-container">
      <div className="profile-image">
        {/* Background image */}
        {/* Overlay Image */}
        <img src="/images/profmanagementimg.png" alt="Profile Management Illustration" /> {/* Add the overlay image here */}
      </div>
      <div className="form-container">
        <h2>Profile Management</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <Controller
            name="fullName"
            control={control}
            rules={{ required: 'Full Name is required', maxLength: { value: 50, message: 'Max 50 characters' } }}
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
            rules={{ required: 'Address is required', maxLength: { value: 100, message: 'Max 100 characters' } }}
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
            rules={{ required: 'City is required', maxLength: { value: 100, message: 'Max 100 characters' } }}
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
                <Select {...field} displayEmpty>
                  {states.map((state) => (
                    <MenuItem key={state.code} value={state.code}>
                      {state.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.state && <FormHelperText>{errors.state.message}</FormHelperText>}
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
                <Select {...field} multiple>
                  {skills.map((skill) => (
                    <MenuItem key={skill.id} value={skill.id}>
                      {skill.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.skills && <FormHelperText>{errors.skills.message}</FormHelperText>}
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
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                error={!!errors.availability}
                helperText={errors.availability ? errors.availability.message : ''}
              />
            )}
          />

          <div className="button-group">
            <Button variant="outlined" color="primary">
              Edit
            </Button>
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
