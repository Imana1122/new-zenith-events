import React from 'react';
import API_BASE_URL from '../../apiConfig';
import { Box, Paper, Typography } from '@mui/material';
import { CiLocationOn, CiTimer } from 'react-icons/ci';
import { format } from 'date-fns';

const EventCard = ({ event, handleClick }) => {
  const formattedStartDate = format(new Date(event.start_date), 'yyyy-MM-dd HH:mm');
  const formattedEndDate = format(new Date(event.end_date), 'yyyy-MM-dd HH:mm');

  return (
    <Box>
      {Object.keys(event).length > 0 ? (
        <Paper
          elevation={3}
          className="event-card relative rounded overflow-hidden shadow-lg md:mb-10 cursor-pointer transition-transform transform-gpu hover:scale-105 p-2"
          onClick={() => handleClick({ eventId: event.id, event: event })}
        >
          <Box position="relative">
            <img
              src={API_BASE_URL + '/storage/images/events/' + event.imagePath}
              alt={event.title}
              className="rounded w-full md:h-[250px]"
            />
            <div className="absolute bottom-0 left-4 right-4 bg-purple-900 text-white px-2 py-1 rounded-t-full text-center md:hidden">
            <Typography variant="body2">Rs.{event.price}</Typography>
        </div>


          </Box>

          <Box sx={{ mt: 2 }} textAlign="left">
            <Typography variant="h6" className="text-purple-900">
              {event.title}
            </Typography>

            <Box sx={{ mt: 1 }} display='block'>
              <Typography variant="body2" className="text-gray-600 flex items-center" mb={1}>
                <CiTimer className='mr-3'/> {formattedStartDate} to {formattedEndDate}
              </Typography>
              <Typography variant="body2" className="text-gray-600 flex items-center" mb={1}>
                <CiLocationOn className='mr-3'/> {event.address}
              </Typography>
            </Box>

            <Box
              display={{ xs: 'none', md: 'flex' }}
              alignItems="center"
              justifyContent="space-between"
              mt={1}
            >
              <Box
                border="1px solid red"
                borderRadius="10px"
                py={1}
                px={2}
                sx={{ display: 'inline-flex' }}
              >
                <Typography variant="body1" className="text-red-500">
                  Rs.{event.price}
                </Typography>
              </Box>
              <Typography variant="body2" className="text-gray-600">
                {event.type}
              </Typography>
            </Box>
          </Box>
        </Paper>
      ) : (
        <Typography variant="body2" className="text-green">
          Loading...
        </Typography>
      )}
    </Box>
  );
};

export default EventCard;
