import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Box } from '@mui/material';

const EsewaFailure = () => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="space-between" alignItems="center" my={10}>
      <Typography variant="h6" color="error" gutterBottom>
        Your booking is not complete as your payment was unsuccessful.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Book your events again{' '}
        <Link to={'/'} style={{ color: '#4CAF50', fontWeight: 'bold', textDecoration: 'none' }}>
          HERE!
        </Link>
      </Typography>
    </Box>
  );
};

export default EsewaFailure;
