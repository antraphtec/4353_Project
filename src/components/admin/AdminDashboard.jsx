import React, { useState, useEffect } from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
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
import './AdminDashboard.css';

const AdminDashboard = ({ supabase }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [selectedView, setSelectedView] = useState('manageEvents');
  const [eventDetails, setEventDetails] = useState({
    name: '',
    desc: '',
    location: '',
    urgency: '',
    skills: '',
    dateTime: '',
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase.from('events').select('*');
        if (error) {
          console.error('Error fetching events:', error);
        } else {
          setEvents(data);
        }
      } catch (err) {
        console.error('Error fetching events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [supabase]);

  const handleDeleteEvent = async (eventId) => {
    const { error } = await supabase.from('events').delete().eq('id', eventId);
    if (error) {
      console.error('Error deleting event:', error);
    } else {
      // Refresh events after deletion
      setEvents(events.filter((event) => event.id !== eventId));
    }
  };

  const handleOpenDialog = (event = null) => {
    setCurrentEvent(event);
    if (event) {
      setEventDetails(event);
    } else {
      setEventDetails({
        name: '',
        desc: '',
        location: '',
        urgency: '',
        skills: '',
        dateTime: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentEvent(null);
  };

  const handleSaveEvent = async () => {
    if (currentEvent) {
      // Update existing event
      const { error } = await supabase
        .from('events')
        .update({
          name: eventDetails.name,
          desc: eventDetails.desc,
          location: eventDetails.location,
          urgency: eventDetails.urgency,
          skills: eventDetails.skills,
          dateTime: eventDetails.dateTime,
        })
        .eq('id', currentEvent.id);

      if (error) {
        console.error('Error updating event:', error);
      } else {
        setEvents(
          events.map((event) =>
            event.id === currentEvent.id ? { ...event, ...eventDetails } : event
          )
        );
      }
    } else {
      // Create new event
      const { data, error } = await supabase
        .from('events')
        .insert([{
          name: eventDetails.name,
          desc: eventDetails.desc,
          location: eventDetails.location,
          urgency: eventDetails.urgency,
          skills: eventDetails.skills,
          dateTime: eventDetails.dateTime,
        }]);

      if (error) {
        console.error('Error adding event:', error);
      } else {
        setEvents([...events, ...data]);
      }
    }
    handleCloseDialog();
  };

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
            <>
              <div className="dashboard-header">
                <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
                  Add Event
                </Button>
              </div>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <TableContainer component={Paper} className="dashboard-content">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Event Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell>Urgency</TableCell>
                        <TableCell>Required Skills</TableCell>
                        <TableCell>Date & Time</TableCell>
                        <TableCell>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {events.map((event) => (
                        <TableRow key={event.id} className="card">
                          <TableCell className="card-title">{event.name}</TableCell>
                          <TableCell className="card-content">{event.desc}</TableCell>
                          <TableCell className="card-content">{event.location}</TableCell>
                          <TableCell className="card-content">{event.urgency}</TableCell>
                          <TableCell className="card-content">{event.skills}</TableCell>
                          <TableCell className="card-content">{event.dateTime}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => handleDeleteEvent(event.id)}
                              className="card-button"
                            >
                              Delete
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleOpenDialog(event)}
                              className="card-button"
                            >
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </>
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

      {/* Dialog for Adding/Editing Events */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{currentEvent ? 'Edit Event' : 'Add Event'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Event Name"
            type="text"
            fullWidth
            value={eventDetails.name}
            onChange={(e) => setEventDetails({ ...eventDetails, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Event Description"
            type="text"
            fullWidth
            value={eventDetails.desc}
            onChange={(e) => setEventDetails({ ...eventDetails, desc: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Location"
            type="text"
            fullWidth
            value={eventDetails.location}
            onChange={(e) => setEventDetails({ ...eventDetails, location: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Urgency (e.g., minor, medium, major, critical)"
            type="text"
            fullWidth
            value={eventDetails.urgency}
            onChange={(e) => setEventDetails({ ...eventDetails, urgency: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Required Skills (comma-separated)"
            type="text"
            fullWidth
            value={eventDetails.skills}
            onChange={(e) => setEventDetails({ ...eventDetails, skills: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Event Date & Time"
            type="datetime-local"
            fullWidth
            value={eventDetails.dateTime}
            onChange={(e) => setEventDetails({ ...eventDetails, dateTime: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEvent} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
