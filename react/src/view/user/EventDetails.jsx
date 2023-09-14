// Import necessary libraries and components
import { useDispatch, useSelector } from 'react-redux';
import { decreaseCount, increaseCount } from '../../redux/countSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import TrainerCard from '../../components/event-details/TrainerCard';
import { DefaultLayoutComponent } from '../../components/pagelayouts/DefaultLayoutComponent';
import API_BASE_URL from '../../apiConfig';
import { format } from 'date-fns';
import {CiLocationOn, CiTimer} from 'react-icons/ci'
import {  Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { FaCircleMinus, FaCirclePlus } from 'react-icons/fa6';

const EventDetails = () => {
  // Get the navigate function from react-router-dom for programmatic navigation
  const navigate = useNavigate();
  // Get the dispatch function from react-redux for dispatching actions
  const dispatch = useDispatch();

  // Get the selectedEvent from the Redux store or set it to null if not available
  const selectedEvent = useSelector((state) => state.event.selectedEvent) || null;

  // Get the count from the Redux store
  const count = useSelector((state) => state.count.count);

  // Check if the selectedEvent is available, otherwise navigate back to the home page
  useEffect(() => {
    if (!selectedEvent) {
      navigate('/');
    }
  });

  // Event handler for increasing the count
  const handleIncrease = () => {
    // Dispatch the increaseCount action with the eventId
    dispatch(increaseCount(selectedEvent?.id));
  };

  // Event handler for decreasing the count
  const handleDecrease = () => {
    // Dispatch the decreaseCount action with the eventId
    dispatch(decreaseCount(selectedEvent?.id));
  };

  const formattedStartDate = format(new Date(selectedEvent.start_date), 'yyyy-MM-dd HH:mm');
  const formattedEndDate = format(new Date(selectedEvent.end_date), 'yyyy-MM-dd HH:mm');

  return (
    <DefaultLayoutComponent>
      {/* Event details section */}
      <div className="bg-white rounded md:px-2 md:m-10 px-4">
        {/* Event image */}
        <div className="flex flex-col md:flex-row md:justify-center md:items-start mb-4 overflow-hidden md:space-x-10">
          <div className="w-full h-full md:full">
            <img src={API_BASE_URL +"/storage/images/events/" +selectedEvent?.imagePath} alt={selectedEvent?.title} className="h-full w-full rounded object-cover" />
          </div>
          {/* Event information */}
          <div className="md:w-[900px] flex flex-col items-start space-y-5 md:m-auto text-2xl">
            <h2 className="text-2xl md:text-5xl text-left text-purple-900">{selectedEvent?.title}</h2>
            <p className="text-left text-3xl ">{selectedEvent?.workshop}</p>
            <div className="border border-purple-900 rounded-lg p-2 w-fit">
              <p className="text-xl md:text-3xl font-semibold text-red-500">Rs.{selectedEvent?.price}</p>
            </div>
            <div className="text-left text-sm md:text-2xl w-full space-x-3 items-center flex"><CiLocationOn/><p>{selectedEvent?.address}</p> </div>
            <div className="text-left text-sm md:text-2xl w-full space-x-3 flex items-center"><CiTimer/> <p>{selectedEvent&&formattedStartDate} to {selectedEvent&& formattedEndDate}</p></div>

            {/* Count control */}
            <div className="flex items-center space-x-5 mt-3">
              <button onClick={handleDecrease}>
                <FaCircleMinus className="text-4xl" />
              </button>
              <p className="text-lg font-semibold mr-2">{count}</p>
              <button onClick={handleIncrease}>
                <FaCirclePlus className="text-4xl" />
              </button>
              {/* Link to the booking form */}
              <Link
                to={{
                  pathname: `/event/${selectedEvent?.title}/cart-form`,
                  state: {
                    selectedEvent: selectedEvent,
                    count: count,
                  },
                }}
                className="bg-purple-900 text-white rounded-lg text-xl w-fit py-2 px-4"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
        {/* Training details */}
        <Box sx={{ py: 2 }}>
          <hr className="border border-purple-300 w-full my-2" />
          <Typography variant="h3" sx={{ color: 'purple', textAlign: {md:'left', sm:'center'}, mb: 2 }}>
            Training Details
          </Typography>

          <hr className="border border-purple-300 w-full my-2 md:hidden" />
          <Typography variant="body1">{selectedEvent?.description}</Typography>
        </Box>
        {/* Trainer profile */}
        <Box sx={{ py: 2 }}>
          <hr className="border border-purple-300 w-full my-2 " />
          <Typography variant="h3" sx={{ color: 'purple', textAlign: {md:'left', sm:'center'}, mb: 2 }}>
            Trainer Profile
          </Typography>
          <hr className="border-purple-300 w-full my-2 " />
          {/* Display trainers and their details */}
          <Grid container spacing={2} justifyContent="start">
            {selectedEvent?.trainers ? (
              selectedEvent.trainers.map((trainer) => (
                <Grid key={trainer.id} item xs={12} sm={6} md={4}>
                  <TrainerCard trainer={trainer} />
                </Grid>
              ))
            ) : (
              <Typography variant="body1">No trainers</Typography>
            )}
          </Grid>
          <Box sx={{ py: 2 }} className='hidden md:block'>
          <Typography variant="h3" sx={{ color: 'purple', textAlign: {md:'left', sm:'center'}, mb: 2 }}>
            Training Host Profile
          </Typography>
          <Typography variant="body1">{selectedEvent?.eventHostDetails}</Typography>
          </Box>
        </Box>
      </div>
    </DefaultLayoutComponent>
  );
};

export default EventDetails;
