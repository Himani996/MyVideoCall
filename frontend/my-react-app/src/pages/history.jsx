
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";



export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState([]);

  // useEffect(() => {
  //   const fetchHistory = async () => {
  //     const data = await getHistoryOfUser();
  //     console.log("FETCHED HISTORY:", data); // check console
  //     setMeetings(Array.isArray(data) ? data : data.history || []); // must be array
  //   };
  //   fetchHistory();
  // }, []);

   useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch {
                // IMPLEMENT SNACKBAR
            }
        }

        fetchHistory();
    }, [])

  let formatDate = (dateString) => {

        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear();

        return `${day}/${month}/${year}`

    }

  return (
    <Box sx={{ p: 2 }}>
      {meetings.length === 0 && (
        <Typography>No meeting history found</Typography>
      )}

      {meetings.map((meeting, index) => (
        <Card key={meeting._id || index} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6">
              Code: {meeting.meetingCode}
            </Typography>
            <Typography color="text.secondary">
              Date: {new Date(meeting.date).toLocaleDateString()}
            </Typography>
            <Typography color="text.secondary">
              user: {meeting.user_id}
            </Typography>
          </CardContent>
        </Card>


      
      ))}
       <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => {
              navigate("/home");
              }}
            >
              back to home
            </Button>
    </Box>
  );
}
