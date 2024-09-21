// src/components/VolunteerMatchingForm.jsx
// import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
import { Select, MenuItem, InputLabel, FormControl, Typography } from '@mui/material';
import './matchingform.css'; 

const VolunteerMatchingForm = () => {
  // Mock data for events and skills (replace with actual API/database calls in the future)
  const mockEvents = [
    { id: 'event1', name: 'Beach Cleanup' },
    { id: 'event2', name: 'Tree Planting' },
    { id: 'event3', name: 'Food Drive' },
  ];

  const mockSkillsByEvent = {
    event1: ['Environmental Awareness', 'Teamwork'],
    event2: ['Gardening', 'Physical Fitness'],
    event3: ['Organizational Skills', 'Communication'],
  };

  const mockVolunteers = [
    'Example Volunteer 1', 'Example Volunteer 2', 'Example Volunteer 3', 'Example Volunteer 4', 'Example Volunteer 5',
    'Example Volunteer 6', 'Example Volunteer 7', 'Example Volunteer 8', 'Example Volunteer 9', 'Example Volunteer 10',
  ];

  // State to handle selected event and skills
  const [selectedEvent, setSelectedEvent] = useState('');
  const [requiredSkills, setRequiredSkills] = useState([]);

  // Handle event change
  const handleEventChange = (event) => {
    const selectedEventId = event.target.value;
    setSelectedEvent(selectedEventId);
    // Simulate fetching skills based on selected event
    setRequiredSkills(mockSkillsByEvent[selectedEventId] || []);
  };

  return (
    <div className="volunteer-matching-container">
      <div className="background-image">
        {/* Placeholder for background image */}
        <img src="/images/matchingimg.jpg" alt="Background" />
      </div>
      
      <div className="form-container">
        <Typography variant="h4">Volunteer Matching Form</Typography>
        <Typography variant="subtitle1">As administrator, you can match volunteers to events</Typography>

        {/* Dropdown for Volunteer Events */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Volunteer Events</InputLabel>
          <Select value={selectedEvent} onChange={handleEventChange}>
            {mockEvents.map((event) => (
              <MenuItem key={event.id} value={event.id}>
                {event.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Skills Display */}
        <Typography variant="h6">Skills:</Typography>
        {requiredSkills.length > 0 ? (
          <ul>
            {requiredSkills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        ) : (
          <Typography variant="body2">** generated from database based on admin input **</Typography>
        )}

        {/* Volunteers List */}
        <hr />
        <Typography variant="h6">Volunteers:</Typography>
        <ul>
          {mockVolunteers.map((volunteer, index) => (
            <li key={index}>{volunteer}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VolunteerMatchingForm;