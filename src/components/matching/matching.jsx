import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import "./matchingform.css";
// import { supabase } from "../supabaseClient"; // Import Supabase client

import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

const VolunteerMatchingForm = () => {
  const [events, setEvents] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [matchedVolunteers, setMatchedVolunteers] = useState([]);
  const [selectedEventName, setSelectedEventName] = useState("");

  // Fetch events and volunteers from Supabase
  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from("events").select("*");
      if (error) console.error("Error fetching events:", error);
      else setEvents(data);
    };

    const fetchVolunteers = async () => {
      const { data, error } = await supabase.from("accounts").select("*");
      if (error) console.error("Error fetching volunteers:", error);
      else setVolunteers(data);
    };

    fetchEvents();
    fetchVolunteers();
  }, []);

  // Handle event selection
  const handleEventChange = (event) => {
    const selectedEventId = event.target.value;
    setSelectedEvent(selectedEventId);

    const eventName =
      events.find((ev) => ev.event_id === selectedEventId)?.name || "";
    setSelectedEventName(eventName);

    setMatchedVolunteers([]); // Clear previous matches
  };

  const handleMatchVolunteers = async () => {
    if (!selectedEvent) {
      alert("Please select an event.");
      return;
    }

    try {
      // Fetch the selected event's skills
      const { data: selectedEventData, error: eventError } = await supabase
        .from("events")
        .select("skills")
        .eq("event_id", selectedEvent)
        .single();

      if (eventError) throw eventError;

      const eventSkills = selectedEventData.skills || [];
      console.log("Selected Event Skills:", eventSkills);

      // Check if eventSkills is an array and has items
      if (!Array.isArray(eventSkills) || eventSkills.length === 0) {
        alert("No skills found for this event.");
        return;
      }

      // Check each account's skills against the event's skills
      const matched = volunteers.filter((account) => {
        console.log("Checking account:", account.fullName);
        console.log("Account Skills:", account.skills);

        // Verify account.skills is an array
        if (!Array.isArray(account.skills)) {
          console.warn(
            `Account ${account.fullName} has invalid skills format.`
          );
          return false;
        }

        // Match skills
        const hasMatchingSkills = account.skills.some((skill) => {
          const matchFound = eventSkills.includes(skill);
          console.log(`Skill: ${skill}, Match Found: ${matchFound}`);
          return matchFound;
        });
        return hasMatchingSkills;
      });

      console.log("Matched Volunteers:", matched);

      if (matched.length === 0) {
        alert("No accounts matched the event skills.");
      }

      setMatchedVolunteers(matched);
    } catch (error) {
      console.error("Error matching accounts:", error.message);
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
          <Select value={selectedEvent} onChange={handleEventChange}>
            {events.map((event) => (
              <MenuItem key={event.event_id} value={event.event_id}>
                {event.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Text Field to Display Selected Event Name */}
        <TextField
          label="Selected Event"
          value={selectedEventName}
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />

        {/* Match Volunteers Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleMatchVolunteers}
        >
          Match Volunteers to Event
        </Button>

        {/* Display Matched Volunteers */}

        {/* Display Matched Volunteers */}
        {matchedVolunteers.length > 0 ? (
          <div>
            <Typography variant="h6">Matched Volunteers:</Typography>
            <ol>
              {matchedVolunteers.map((volunteer) => (
                <li key={volunteer.email_address}>
                  {volunteer.fullName} - Skills: {volunteer.skills.join(", ")}
                </li>
              ))}
            </ol>
          </div>
        ) : (
          selectedEvent && (
            <Typography variant="body1" color="textSecondary">
              No matching volunteers found.
            </Typography>
          )
        )}

        {/* Display Matched Volunteers */}
      </div>
    </div>
  );
};

export default VolunteerMatchingForm;
