import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import API_BASE_URL from '../../apiConfig';

const TrainerCard = ({ trainer }) => {
  return (
    <Paper elevation={3} sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
      <Box sx={{ width: '50%', mr: 2 }}>
        <img
          src={API_BASE_URL + '/storage/images/trainers/' + trainer.imagePath}
          alt={trainer.name}
          style={{ width: '200px', height: '180px', borderRadius: 'lg' }}
        />
      </Box>
      <Box sx={{ width: '50%' }}>
        <Typography variant="h6" sx={{ color: 'purple.900', fontWeight: 'bold', mb: 1 }}>
          {trainer.name}
        </Typography>
        <Typography variant="subtitle1">{trainer.post}</Typography>
        <Typography variant="body2">{trainer.skillLevel}</Typography>
        <Typography variant="body2">{trainer.experienceYears} years of experience</Typography>
      </Box>
    </Paper>
  );
};

export default TrainerCard;
