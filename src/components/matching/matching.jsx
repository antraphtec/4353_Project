import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Button,
} from "@mui/material";
import "./matchingform.css";

const VolunteerMatchingForm = ({ supabase }) => {
  const [events, setEvents] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [matchedVolunteers, setMatchedVolunteers] = useState([]);

  // Fetch events from Supabase
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log("Fetching events..."); // Add debug statement here
        const { data, error } = await supabase.from("events").select("*");

        if (error) throw error;

        console.log("Fetched events:", data); // Debug statement to see fetched data
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error.message);
      }
    };

    fetchEvents();
  }, [supabase]);

  // Fetch volunteers from Supabase
  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const { data, error } = await supabase.from("volunteers").select("*");

        if (error) throw error;

        console.log("Fetched volunteers:", data); // Debug statement
        setVolunteers(data);
      } catch (error) {
        console.error("Error fetching volunteers:", error.message);
      }
    };

    fetchVolunteers();
  }, [supabase]);

  // Handle event selection change
  const handleEventChange = (event) => {
    const selectedEventId = event.target.value;

    console.log("Event selection triggered:", selectedEventId); // Debugging

    setSelectedEvent(selectedEventId);
    setMatchedVolunteers([]); // Clear previous matches when new event is selected
  };

  // Handle volunteer matching
  const handleMatchVolunteers = async () => {
    console.log("Selected event before matching:", selectedEvent); // Debug log for selected event

    if (!selectedEvent) {
      alert("Please select an event.");
      return;
    }

    try {
      // Fetch the selected event's skills
      const { data: selectedEventData, error: eventError } = await supabase
        .from("events")
        .select("skills")
        .eq("id", selectedEvent)
        .single();

      if (eventError) throw eventError;

      const eventSkills = selectedEventData.skills;

      // Match volunteers based on skills
      const matched = volunteers.filter((volunteer) =>
        volunteer.skills.some((skill) => eventSkills.includes(skill))
      );

      if (matched.length === 0) {
        alert("No volunteers matched the event skills.");
      } else {
        setMatchedVolunteers(matched);
        alert("Volunteers successfully matched to the event.");
      }

      // Insert matched volunteers into the event_volunteer_matches table
      const { error: matchError } = await supabase
        .from("event_volunteer_matches")
        .insert(
          matched.map((volunteer) => ({
            event_id: selectedEvent,
            volunteer_id: volunteer.id,
          }))
        );

      if (matchError) throw matchError;
    } catch (error) {
      console.error("Error matching volunteers:", error.message);
    }
  };

  return (
    <div className="volunteer-matching-container">
      <div className="background-image">
        <img src="/images/matchingimg.jpg" alt="Background" />
      </div>

      <div className="form-container">
        <Typography variant="h4">Volunteer Matching Form</Typography>
        <Typography variant="subtitle1">
          As administrator, you can match volunteers to events
        </Typography>

        {/* Dropdown for Volunteer Events */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Volunteer Events</InputLabel>
          {events.length > 0 ? (
            <Select
              value={selectedEvent}
              onChange={handleEventChange} // Correctly bind onChange
            >
              {events.map((event) => (
                <MenuItem key={event.id} value={event.id}>
                  {event.name}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <Typography>No events available</Typography>
          )}
        </FormControl>

        {/* Volunteers List */}
        <Typography variant="h6">Volunteers:</Typography>
        <ul>
          {volunteers.map((volunteer, index) => (
            <li key={index}>{volunteer.name}</li>
          ))}
        </ul>

        {/* Match Volunteers Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleMatchVolunteers}
        >
          Match Volunteers to Event
        </Button>

        {/* Display Matched Volunteers */}
        {matchedVolunteers.length > 0 && (
          <>
            <Typography variant="h6">Matched Volunteers:</Typography>
            <ul>
              {matchedVolunteers.map((volunteer, index) => (
                <li key={index}>{volunteer.name}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default VolunteerMatchingForm;
