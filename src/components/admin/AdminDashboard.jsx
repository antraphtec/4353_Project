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
  const [eventDetails, setEventDetails] = useState({ name: '', desc: '', location: '' });

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
      setEventDetails({ name: '', desc: '', location: '' });
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
        .update({ name: eventDetails.name, desc: eventDetails.desc, location: eventDetails.location })
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
        .insert([{ name: eventDetails.name, desc: eventDetails.desc, location: eventDetails.location }]);

      if (error) {
        console.error('Error adding event:', error);
      } else {
        setEvents([...events, ...data]);
      }
    }
    handleCloseDialog();
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
            Add Event
          </Button>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Event Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>{event.name}</TableCell>
                    <TableCell>{event.desc}</TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDeleteEvent(event.id)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpenDialog(event)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

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
                label="Description"
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
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
