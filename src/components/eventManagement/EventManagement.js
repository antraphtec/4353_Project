import React, { useState } from "react";
import "./EventManagement.css";
import { createClient } from "@supabase/supabase-js";
import skillsList from "../skillsList";

// Initialize Supabase client
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

function EventManagement() {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [location, setLocation] = useState("");
  const [urgency, setUrgency] = useState("");
  const [skills, setSkills] = useState([]);
  const [eventDate, setEventDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !eventName ||
      !eventDescription ||
      !location ||
      !urgency ||
      !skills.length ||
      !eventDate
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    const eventData = {
      name: eventName,
      description: eventDescription,
      location,
      urgency,
      skills,
      date: eventDate,
    };

    try {
      console.log("Sending event data to Supabase:", eventData);

      // Insert event into events table
      const { data: eventDataResponse, error: eventError } = await supabase
        .from("events")
        .insert([eventData]);

      if (eventError) {
        console.error("Supabase insert error:", eventError);
        alert(
          "Something went wrong while saving the event: " + eventError.message
        );
        return;
      }

      // Notify all volunteers about the new event
      const { data: volunteerEmails, error: volunteerError } = await supabase
        .from("accounts")
        .select("email_address")
        .eq("role", "volunteer");

      if (volunteerError) {
        console.error("Error fetching volunteer emails:", volunteerError);
      } else {
        const notifications = volunteerEmails.map((volunteer) => ({
          recipient: volunteer.email_address,
          message: `New event created: ${eventName}`,
          event_id: eventDataResponse[0].id, // Assuming eventDataResponse has the event ID
        }));

        const { error: notificationError } = await supabase
          .from("notifications")
          .insert(notifications);

        if (notificationError) {
          console.error("Error sending notifications:", notificationError);
        } else {
          alert("Event Published and Volunteers Notified!");
        }
      }
    } catch (error) {
      console.error("Unexpected error creating event:", error.message);
      alert("Unexpected error occurred, please try again later.");
    }
  };

  const handleSkillsChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setSkills([...skills, value]);
    } else {
      setSkills(skills.filter((skill) => skill !== value));
    }
  };

  return (
    <div className="container">
      <div className="form-side">
        <h2>Manage Events</h2>
        <p className="subheading">
          As administrator, you can create and publish events here.
        </p>
        <p className="form-title">Please Fill Out The Form</p>
        <form id="event-form" onSubmit={handleSubmit}>
          <label htmlFor="event-name">Name of Event</label>
          <input
            type="text"
            id="event-name"
            name="event-name"
            placeholder="Volunteer event..."
            maxLength="100"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />

          <label htmlFor="event-description">Event Description</label>
          <textarea
            id="event-description"
            name="event-description"
            placeholder="A brief description of the event..."
            rows="4"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            required
          />

          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Type in the event location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />

          <label htmlFor="urgency">Urgency</label>
          <select
            id="urgency"
            name="urgency"
            value={urgency}
            onChange={(e) => setUrgency(e.target.value)}
            required
          >
            <option value="">Select Urgency</option>
            <option value="minor">Minor</option>
            <option value="medium">Medium</option>
            <option value="major">Major</option>
            <option value="critical">Critical</option>
          </select>

          <label htmlFor="skills">Required Skills</label>
          <div className="checkbox-group">
            {skillsList.map(({ id, name }) => (
              <label key={id}>
                <input
                  type="checkbox"
                  value={id}
                  checked={skills.includes(id)}
                  onChange={handleSkillsChange}
                />
                {name}
              </label>
            ))}
          </div>

          <label htmlFor="event-date">Event Date & Time</label>
          <input
            type="date"
            id="event-date"
            name="event-date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            required
          />

          <button type="submit">Publish Event</button>
        </form>
      </div>
      <div className="image-section">
        <img
          className="event-image"
          src="/images/calendar_icon.png"
          alt="Event Calendar Icon"
        />
      </div>
    </div>
  );
}

export default EventManagement;
