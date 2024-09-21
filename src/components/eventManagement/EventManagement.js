// src/components/eventManagement/EventManagement.js
import React, { useState } from "react";
import "./EventManagement.css";

function EventManagement() {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [location, setLocation] = useState("");
  const [urgency, setUrgency] = useState("");
  const [skills, setSkills] = useState([]);
  const [eventDate, setEventDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!eventName || !eventDescription || !location || !urgency || !skills.length || !eventDate) {
      alert("Please fill out all required fields.");
      return;
    }

    const eventData = {
      eventName,
      eventDescription,
      location,
      urgency,
      skills,
      eventDate,
    };

    console.log(eventData);
    alert("Event Published Successfully!");
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
        <p className="subheading">As administrator, you can create and edit existing events here.</p>
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
            <label>
              <input
                type="checkbox"
                value="leadership"
                checked={skills.includes("leadership")}
                onChange={handleSkillsChange}
              />
              Leadership
            </label>
            <label>
              <input
                type="checkbox"
                value="communication"
                checked={skills.includes("communication")}
                onChange={handleSkillsChange}
              />
              Communication
            </label>
            <label>
              <input
                type="checkbox"
                value="time-management"
                checked={skills.includes("time-management")}
                onChange={handleSkillsChange}
              />
              Time Management
            </label>
            <label>
              <input
                type="checkbox"
                value="problem-solving"
                checked={skills.includes("problem-solving")}
                onChange={handleSkillsChange}
              />
              Problem Solving
            </label>
            <label>
              <input
                type="checkbox"
                value="construction"
                checked={skills.includes("construction")}
                onChange={handleSkillsChange}
              />
              Construction
            </label>
            <label>
              <input
                type="checkbox"
                value="organization"
                checked={skills.includes("organization")}
                onChange={handleSkillsChange}
              />
              Organization
            </label>
            <label>
              <input
                type="checkbox"
                value="teamwork"
                checked={skills.includes("teamwork")}
                onChange={handleSkillsChange}
              />
              Teamwork
            </label>
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
        <img className="event-image" src="/images/calendar_icon.png" alt="Event Calendar Icon" />
    </div>

    </div>
  );
}

export default EventManagement;

