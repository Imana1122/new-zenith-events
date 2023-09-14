import { Button, Typography } from '@mui/material';
import { Box, ThemeProvider, createTheme } from '@mui/system';
import React from 'react';



const BlueBanner = () => {
  return (
    <Box className="bg-blue-500 py-10">
      <div className="container px-4 flex items-center justify-center space-x-20 ">
        <Typography variant="h6" className="text-white">
            Are you a <br/>Professional Trainer?
        </Typography>

        <Button variant='contained' color='secondary'>Join Us !</Button>


      </div>
    </Box>
  );
};

export default BlueBanner;
