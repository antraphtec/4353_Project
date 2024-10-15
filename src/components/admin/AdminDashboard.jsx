import React, { useState } from 'react';
import {
  Button, // <-- Add this import
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import ProfileManagement from '../profileManagement/profileManagementPage';
import VolunteerMatching from '../matching/matching';
import EventManagement from '../eventManagement/EventManagement'; // Import EventManagement component

import './AdminDashboard.css';

const AdminDashboard = ({ supabase }) => {
  const [selectedView, setSelectedView] = useState('manageEvents');

  // Function to handle which view to show on the dashboard
  const handleSelectView = (view) => {
    setSelectedView(view);
  };

  return (
    <div className="admin-dashboard">
      <Box sx={{ display: 'flex' }}>
        {/* Drawer for Navigation */}
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{
            width: 240,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
          }}
        >
          <List>
            <Typography variant="h5" style={{ margin: '20px', fontWeight: 'bold' }}>
              Admin Dashboard
            </Typography>
            <Divider />
            <ListItem button onClick={() => handleSelectView('profileManagement')}>
              <ListItemText primary="Profile Management" />
            </ListItem>
            <ListItem button onClick={() => handleSelectView('manageEvents')}>
              <ListItemText primary="Manage Events" />
            </ListItem>
            <ListItem button onClick={() => handleSelectView('volunteerMatching')}>
              <ListItemText primary="Volunteer Matching" />
            </ListItem>
            <ListItem button onClick={() => handleSelectView('notifications')}>
              <ListItemText primary="Send/Schedule Notifications" />
            </ListItem>
            <ListItem button onClick={() => handleSelectView('volunteerHistory')}>
              <ListItemText primary="Volunteer History" />
            </ListItem>
          </List>
        </Drawer>

        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            marginLeft: '240px', // Add margin to prevent overlap with the drawer
          }}
        >
          <Typography variant="h4" style={{ marginBottom: '20px' }}>
            {selectedView === 'profileManagement' && 'Profile Management'}
            {selectedView === 'manageEvents' && 'Manage Events'}
            {selectedView === 'volunteerMatching' && 'Volunteer Matching'}
            {selectedView === 'notifications' && 'Send/Schedule Notifications'}
            {selectedView === 'volunteerHistory' && 'Volunteer History'}
          </Typography>

          {/* Profile Management */}
          {selectedView === 'profileManagement' && (
            <ProfileManagement supabase={supabase} />
          )}

          {/* Manage Events */}
          {selectedView === 'manageEvents' && (
            <EventManagement />
          )}

          {/* Volunteer Matching */}
          {selectedView === 'volunteerMatching' && (
            <VolunteerMatching supabase={supabase} />
          )}

          {/* Notifications (Placeholder) */}
          {selectedView === 'notifications' && (
            <div>
              <Typography variant="h6">Notification Management</Typography>
              <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
                Send Notification
              </Button>
              {/* Add form or UI for sending notifications */}
            </div>
          )}

          {/* Volunteer History (Placeholder) */}
          {selectedView === 'volunteerHistory' && (
            <div>
              <Typography variant="h6">Volunteer Participation History</Typography>
              {/* Add components to fetch and display volunteer participation history */}
            </div>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default AdminDashboard;
