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
} from "@mui/material";
import { format } from "date-fns";
import './VolunteerHistory.css'; // Importing the CSS for styling

const VolunteerHistory = ({ supabase }) => {
  const [volunteerHistory, setVolunteerHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVolunteerHistory = async () => {
      try {
        // Fetching event data along with volunteer participation status
        const { data, error } = await supabase
          .from("volunteer_participation") // Assuming this is the table that tracks participation
          .select(`
            participation_status,
            events (
              name,
              description,
              location,
              skills,
              urgency,
              date
            )
          `);

        if (error) {
          console.error("Error fetching volunteer history:", error);
        } else {
          setVolunteerHistory(data);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteerHistory();
  }, [supabase]);

  if (loading) {
    return <p>Loading volunteer history...</p>;
  }

  return (
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
            <TableCell>Participation Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {volunteerHistory.map((history, index) => (
            <TableRow key={index}>
              <TableCell>{history.events.name}</TableCell>
              <TableCell>{history.events.description}</TableCell>
              <TableCell>{history.events.location}</TableCell>
              <TableCell>
                {history.events.date
                  ? format(new Date(history.events.date), "MMMM d, yyyy h:mm a")
                  : "No Date Available"}
              </TableCell>
              <TableCell>
                {history.events.skills && history.events.skills.length > 0
                  ? history.events.skills.join(", ")
                  : "No Skills"}
              </TableCell>
              <TableCell>{history.events.urgency}</TableCell>
              <TableCell>{history.participation_status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VolunteerHistory;