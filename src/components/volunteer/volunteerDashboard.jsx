// Your existing imports
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
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import ProfileManagement from '../profileManagement/profileManagementPage';
import './volunteerDashboard.css';

// Import date formatting function
import { format } from 'date-fns';

const VolunteerDashboard = ({ supabase }) => {
  const [activePage, setActivePage] = useState('Profile Management');
  const [events, setEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [loadingNotifications, setLoadingNotifications] = useState(true);

  // Fetch events on load
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
        setLoadingEvents(false);
      }
    };
    fetchEvents();
  }, [supabase]);

  // Fetch notifications on load
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data, error } = await supabase.from('notifications').select('*');
        if (error) {
          console.error('Error fetching notifications:', error);
        } else {
          setNotifications(data);
        }
      } catch (err) {
        console.error('Error fetching notifications:', err);
      } finally {
        setLoadingNotifications(false);
      }
    };
    fetchNotifications();
  }, [supabase]);

  // Render content based on the active page
  const renderContent = () => {
    switch (activePage) {
      case 'Profile Management':
        return <ProfileManagement supabase={supabase} />;
      case 'View Events':
        return loadingEvents ? (
          <p>Loading events...</p>
        ) : (
          <TableContainer component={Paper} className="dashboard-content">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Event Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Skills</TableCell>
                  <TableCell>Urgency</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell>{event.name}</TableCell>
                    <TableCell>{event.description}</TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>{event.date ? format(new Date(event.date), 'MMMM d, yyyy h:mm a') : 'No Date Available'}</TableCell>
                    <TableCell>
                      {event.skills && event.skills.length > 0 ? event.skills.join(', ') : 'No Skills Available'}
                    </TableCell>
                    <TableCell>{event.urgency}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      case 'View Notifications':
        return loadingNotifications ? (
          <p>Loading notifications...</p>
        ) : (
          <TableContainer component={Paper} className="dashboard-content">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Notification</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notifications.map((notification) => (
                  <TableRow key={notification.id}>
                    <TableCell>{notification.message}</TableCell>
                    <TableCell>{new Date(notification.date).toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      default:
        return <p>Select a page from the menu.</p>;
    }
  };

  return (
    <div className="volunteer-dashboard">
      <Drawer
        className="drawer"
        variant="permanent"
        anchor="left"
        classes={{ paper: 'drawer-paper' }}
      >
        <div className="drawer-header">Volunteer Dashboard</div>
        <List>
          <ListItem button onClick={() => setActivePage('Profile Management')}>
            <ListItemText primary="Profile Management" />
          </ListItem>
          <ListItem button onClick={() => setActivePage('View Events')}>
            <ListItemText primary="View Events" />
          </ListItem>
          <ListItem button onClick={() => setActivePage('View Notifications')}>
            <ListItemText primary="View Notifications" />
          </ListItem>
        </List>
      </Drawer>
      <main className="main-content">{renderContent()}</main>
    </div>
  );
};

export default VolunteerDashboard;