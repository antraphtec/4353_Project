import React, { useState, useEffect } from 'react';
import {
  Button,
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
import EventManagement from '../eventManagement/EventManagement';
import './AdminDashboard.css';

const AdminDashboard = ({ supabase }) => {
  const [selectedView, setSelectedView] = useState('manageEvents');
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data, error } = await supabase
          .from('accounts')
          .select('role')
          .eq('email_address', session.user.email)
          .single();
        if (!error && data.role === 'admin') {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    };
    checkAdminStatus();
  }, [supabase]);

  const handleSelectView = (view) => {
    setSelectedView(view);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return <div>Access denied. You must be an admin to view this page.</div>;
  }

  return (
    <div className="admin-dashboard">
      <Box sx={{ display: 'flex' }}>
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

        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            marginLeft: '240px',
          }}
        >
          <Typography variant="h4" style={{ marginBottom: '20px' }}>
            {selectedView === 'profileManagement' && 'Profile Management'}
            {selectedView === 'manageEvents' && 'Manage Events'}
            {selectedView === 'volunteerMatching' && 'Volunteer Matching'}
            {selectedView === 'notifications' && 'Send/Schedule Notifications'}
            {selectedView === 'volunteerHistory' && 'Volunteer History'}
          </Typography>

          {selectedView === 'profileManagement' && (
            <ProfileManagement supabase={supabase} />
          )}
          {selectedView === 'manageEvents' && (
            <EventManagement supabase={supabase} />
          )}
          {selectedView === 'volunteerMatching' && (
            <VolunteerMatching supabase={supabase} />
          )}
          {selectedView === 'notifications' && (
            <div>
              <Typography variant="h6">Notification Management</Typography>
              <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
                Send Notification
              </Button>
            </div>
          )}
          {selectedView === 'volunteerHistory' && (
            <div>
              <Typography variant="h6">Volunteer Participation History</Typography>
            </div>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default AdminDashboard;
