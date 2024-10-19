import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { format } from "date-fns";
import './volunteerHistory.css'; // Importing the CSS for styling

const VolunteerHistory = ({ supabase }) => {
  const [volunteerHistory, setVolunteerHistory] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch the list of volunteers (email addresses) from the "account" table on component mount
  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const { data, error } = await supabase
          .from("accounts") // Fetching from the account table
          .select("email_address"); // Fetch volunteer email addresses

        if (error) {
          console.error("Error fetching volunteers:", error);
        } else {
          setVolunteers(data); // Store the volunteer emails for dropdown
        }
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchVolunteers();
  }, [supabase]);

  // Fetch volunteer's participated events when a volunteer is selected
  useEffect(() => {
    const fetchVolunteerEvents = async () => {
      if (!selectedVolunteer) return; // Do nothing if no volunteer is selected

      setLoading(true);
      try {
        // First, fetch the events_participated array from the account table for the selected volunteer
        const { data: accountData, error: accountError } = await supabase
          .from("accounts")
          .select("events_participated")
          .eq("email_address", selectedVolunteer)
          .single(); // Since email is unique, we use single() to get a single record

        if (accountError) {
          console.error("Error fetching volunteer events:", accountError);
          return;
        }

        const eventIds = accountData?.events_participated || [];

        if (eventIds.length === 0) {
          setVolunteerHistory([]); // No events participated
          setLoading(false);
          return;
        }

        // Now, fetch the events based on the event IDs from the "events" table
        const { data: eventsData, error: eventsError } = await supabase
          .from("events")
          .select(`
            name,
            description,
            location,
            skills,
            urgency,
            date
          `)
          .in("event_id", eventIds); // Fetch events where event_id is in the eventIds array

        if (eventsError) {
          console.error("Error fetching events:", eventsError);
        } else {
          setVolunteerHistory(eventsData); // Store the events data
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteerEvents();
  }, [selectedVolunteer, supabase]);

  if (loading) {
    return <p>Loading volunteer history...</p>;
  }

  return (
    <div>
      {/* Dropdown to select a volunteer by email */}
      <FormControl style={{ minWidth: 200, marginBottom: '20px' }}>
        <InputLabel>Select Volunteer by Email</InputLabel>
        <Select
          value={selectedVolunteer}
          onChange={(e) => setSelectedVolunteer(e.target.value)}
        >
          {volunteers.map((volunteer) => (
            <MenuItem key={volunteer.email_address} value={volunteer.email_address}>
              {volunteer.email_address}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Volunteer History Table */}
      <TableContainer component={Paper} className="volunteer-history-table">
        <Typography variant="h6" style={{ padding: "20px" }}>
          Volunteer Participation History
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Event Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Skills Required</TableCell>
              <TableCell>Urgency</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {volunteerHistory.length > 0 ? (
              volunteerHistory.map((event, index) => (
                <TableRow key={index}>
                  <TableCell>{event.name}</TableCell>
                  <TableCell>{event.description}</TableCell>
                  <TableCell>{event.location}</TableCell>
                  <TableCell>
                    {event.date
                      ? format(new Date(event.date), "MMMM d, yyyy h:mm a")
                      : "No Date Available"}
                  </TableCell>
                  <TableCell>
                    {event.skills && event.skills.length > 0
                      ? event.skills.join(", ")
                      : "No Skills"}
                  </TableCell>
                  <TableCell>{event.urgency}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No events participated in.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default VolunteerHistory;



