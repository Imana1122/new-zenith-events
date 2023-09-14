import React from 'react';
import { Paper, Typography, Divider, List, ListItem, ListItemText, Button } from '@mui/material';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const BookingDetails = ({ booking }) => {
  const formattedStartDate = format(new Date(booking.event.start_date), 'yyyy-MM-dd HH:mm');
  const formattedEndDate = format(new Date(booking.event.end_date), 'yyyy-MM-dd HH:mm');
  return (
    <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
      <Typography variant="h6">Booking Details</Typography>
      <Divider sx={{ marginY: 1 }} />

      <Typography variant="subtitle1">Booking ID: {booking.bookOrderId}</Typography>
      <Typography variant="subtitle1">Total Amount: Rs.{booking.totalAmount}</Typography>
      <Typography variant="subtitle1">Esewa Status: {booking.esewa_status ? 'Paid' : 'Not Paid'}</Typography>

      {booking.event && (
        <>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="h6">Event Details</Typography>
          <Divider sx={{ marginY: 1 }} />

          <Typography variant="subtitle1">Event Title: {booking.event.title}</Typography>
          <Typography variant="subtitle1">Event Date: {formattedStartDate} to {formattedEndDate}</Typography>
          <Typography variant="subtitle1">Event Address: {booking.event.address}</Typography>

          {booking.event.trainers && (
            <>
              <Divider sx={{ marginY: 2 }} />
              <Typography variant="h6">Trainers</Typography>


              <List>
                {booking.event.trainers.map((trainer) => (
                  <ListItem key={trainer.id}>
                    <ListItemText primary={trainer.name} secondary={`Skill Level: ${trainer.skillLevel}`} />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </>
      )}
      <Button variant="contained" color="secondary" ><Link to="/">Ok</Link> </Button>
    </Paper>
  );
};

export default BookingDetails;
