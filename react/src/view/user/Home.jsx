import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setEvents, selectEvent, selectEventDetails } from '../../redux/eventSlice';
import EventCard from '../../components/home/EventCard';
import BlueBanner from '../../components/home/BlueBanner';
import HeroSection from '../../components/home/HeroSection';
import BookEventsSection from '../../components/home/BookEventsSection';
import EventFeature from '../../components/home/EventFeature';
import axiosClient from '../../axios';
import { DefaultLayoutComponent } from '../../components/pagelayouts/DefaultLayoutComponent';
import API_BASE_URL from '../../apiConfig';

function Home() {
  // Get the events state from the Redux store or set it to an empty array if not available
  const eventsState = useSelector((state) => state.event.events) || [];
  // State to store a limited number of events to display on the homepage
  const [limitedEvents, setLimitedEvents] = useState([]);

  // Get the navigate function from react-router-dom for programmatic navigation
  const navigate = useNavigate();
  // Get the dispatch function from react-redux for dispatching actions
  const dispatch = useDispatch();

  // Fetch events from the server when the component mounts
  useEffect(() => {

    axiosClient
      .get('/events')
      .then((response) => {
        // Dispatch the setEvents action with the fetched events data
        dispatch(setEvents(response.data.events));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch]);

  // Update limitedEvents when eventsState changes to show only the first five events
  useEffect(() => {
    console.log(eventsState)
    setLimitedEvents(eventsState.slice(0, 5));
  }, [eventsState]);

  // Event handler for when an event card is clicked
  const handleClick = async ({ eventId, event }) => {
    // Dispatch the selectEvent action with the selected event ID
    dispatch(selectEvent(eventId));



    // Introduce a delay of 2 seconds (just for demonstration)
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Dispatch the selectEventDetails action with the selected event data
    dispatch(selectEventDetails(event));

    // Navigate to the event details page
    navigate(`/event/${event.title}`);
  };

  const [backgroundImage, setBackgroundImage] = useState('');

    useEffect(()=>{
        getImages()

    },[])

  const getImages = () => {
      axiosClient.get('/get-application-details')
        .then((response) => {
          setBackgroundImage(response.data.application_detail.background_image);

        })
        .catch((error) => {
        //   console.log(error);
        });

  }

  return (
    <DefaultLayoutComponent>
    <div className="px-5 overflow:hidden">
      <div className="hidden md:grid">
        <div className="border border-black">
          <img
            className="bg-cover bg-center w-full h-[400px]"
            src={API_BASE_URL + '/storage/images/application/'+backgroundImage}/>


        </div>
        <HeroSection />
      </div>
      <div className="grid md:flex md:flex-row md:space-x-10 justify-center items-inline flex-wrap xl:px-30">
        {/* Render event cards if eventsState contains data, otherwise show loading message */}
        {eventsState.length > 0 ? (
          limitedEvents.map((event) => (
            <EventCard key={event.id} event={event} handleClick={handleClick} />
          ))
        ) : (
          <p className="text-xl my-5 text-red-700 font-light">No Events right now</p>
        )}
      </div>
      <div className="hidden md:grid">
        <BookEventsSection />
        <EventFeature />
        <BlueBanner />
      </div>
    </div>
    </DefaultLayoutComponent>
  );
}

export default Home;
