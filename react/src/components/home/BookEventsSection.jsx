import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const BookEventsSection = () => {
  return (
    <Box className='my-10 text-blue-500 text-center'>
       <Typography variant="h3" className="text-blue-600">
            Book your Events
        </Typography>
        <Typography variant="body1" className="text-blue-600">
            Book your Seat Earlier and Get Discounts
        </Typography>
    </Box>
  );
};

export default BookEventsSection;
