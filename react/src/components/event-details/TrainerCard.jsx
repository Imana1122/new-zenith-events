import React from 'react';
import { Box, Typography, Paper, useMediaQuery } from '@mui/material';
import API_BASE_URL from '../../apiConfig';

const TrainerCard = ({ trainer }) => {

    const isMdScreen = useMediaQuery((theme) => theme.breakpoints.up('md'));

  return (
    <Paper elevation={3} sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
      <Box sx={{ width: '50%', mr: 2 }}>
        <img
          src={API_BASE_URL + '/storage/images/trainers/' + trainer.imagePath}
          alt={trainer.name}
          style={{ width: 'full' , height: '150px', borderRadius: 'lg' }}
        />
      </Box>
      <Box sx={{ width: '50%' }}>
        <Typography variant={isMdScreen ? 'h6' : 'subtitle1'} sx={{ color: 'purple.900', fontWeight: 800, mb: 1 }}>
          {trainer.name}
        </Typography>
        <Typography  variant={isMdScreen ? 'subtitle1' : 'subtitle1'} sx={{ fontWeight: 600 }}>{trainer.post}</Typography>
        <Typography variant="body2" >{trainer.skillLevel}</Typography>
        <Typography variant="body2" sx={{ color: 'blue' }}>{trainer.experienceYears} years of experience</Typography>
        <div>
    </div>
      </Box>
    </Paper>
  );
};

export default TrainerCard;
