import React from 'react';
import { Typography, Button, Box, Paper } from '@mui/material';

const EventFeature = () => {
  return (
    <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" gap={5} marginBottom={10}>
      <Box flex="0.33">
        <Paper elevation={3}>
          <img
            src="https://th.bing.com/th/id/OIP.SzruJdQXDlSQc9BETSX_8wHaEK?w=257&h=180&c=7&r=0&o=5&pid=1.7"
            alt="Event"
            className="w-full rounded-lg"
          />
        </Paper>
      </Box>
      <Box flex="0.33" textAlign="left">
        <Typography variant="h4" color="primary">
          Mega DS Talk Show
        </Typography>
        <Typography variant="body1" color="textSecondary">
          7th April, 2024
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Chitlang, Makwanpur
        </Typography>
        <Button variant="contained" color="primary" size="large" sx={{ marginTop: 3, borderRadius: '16px' }}>
          Buy Now
        </Button>
        {/* Additional details or components can be added here */}
      </Box>
    </Box>
  );
};

export default EventFeature;
