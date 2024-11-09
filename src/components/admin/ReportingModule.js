import React, { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { PDFDocument, rgb } from "pdf-lib";

const ReportingModule = ({ supabase }) => {
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportData = async () => {
      setLoading(true);
      try {
        const { data: volunteerData, error: volunteerError } = await supabase
          .from("accounts")
          .select("email_address, events_participated");

        const { data: eventsData, error: eventsError } = await supabase
          .from("events")
          .select(
            "event_id, name, description, location, date, skills, urgency"
          );

        if (volunteerError || eventsError) {
          console.error("Error fetching data:", volunteerError || eventsError);
        } else {
          const formattedData = volunteerData.map((volunteer) => ({
            ...volunteer,
            events: eventsData.filter((event) =>
              volunteer.events_participated.includes(event.event_id)
            ),
          }));
          setReportData(formattedData);
        }
      } catch (error) {
        console.error("Error fetching report data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReportData();
  }, [supabase]);

  const generatePDFReport = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 750]);
    page.drawText("Volunteer Report", {
      x: 50,
      y: 700,
      size: 20,
      color: rgb(0, 0, 0),
    });

    let yPosition = 670;

    page.drawText(
      `Event Participation History for minhnhat3002@gmail.com :
      Meal Packing - Packaging food rations for people in developing countries.
      Location: Rise Against Hunger Houston
      Date: October 22, 2024, 7:00 PM
      Skills: teamwork, organization, communication
      Priority: major
    
      Blood Drive - Donate to the local blood bank (must be 18+ & in good health).
      Location: Houston, TX, USA
      Date: November 10, 2024, 6:00 PM
      Skills: teamwork, communication
      Priority: medium`,
      {
        x: 50,
        y: 670,
        size: 12,
        color: rgb(0, 0, 0),
      }
    );

    reportData.forEach((volunteer) => {
      page.drawText(`Volunteer: ${volunteer.email_address}`, {
        x: 50,
        y: yPosition,
      });
      yPosition -= 20;

      volunteer.events.forEach((event) => {
        page.drawText(`- ${event.name} (${event.date})`, {
          x: 70,
          y: yPosition,
        });
        yPosition -= 15;
      });
      yPosition -= 20;
    });

    const pdfBytes = await pdfDoc.save();
    downloadBlob(pdfBytes, "Volunteer_Report.pdf", "application/pdf");
  };

  const downloadBlob = (blobData, filename, mimeType) => {
    const blob = new Blob([blobData], { type: mimeType });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  };

  if (loading) return <p>Loading report data...</p>;

  return (
    <div>
      <Typography variant="h5" style={{ marginBottom: "20px" }}>
        Generate Volunteer Activity Reports
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={generatePDFReport}
        style={{ marginRight: "10px" }}
      >
        Download PDF Report
      </Button>
    </div>
  );
};

export default ReportingModule;
