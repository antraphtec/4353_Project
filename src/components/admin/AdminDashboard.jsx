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
} from '@mui/material';
import './AdminDashboard.css';

const AdminDashboard = ({ supabase }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
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

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
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
