import React, { useEffect, useRef, useState } from 'react';
import {  useLocation } from 'react-router-dom';
import axiosClient from '../../axios';
import BookingDetails from './BookingDetails';
import { Typography } from '@mui/material';
import { FaCheckCircle } from 'react-icons/fa';
import { BiSolidErrorCircle } from 'react-icons/bi';

const EsewaSuccess = () => {
    const [message, setMessage] = useState("");
    const [error, setError] =useState("");
    const [booking, setBooking]= useState({});
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const oid = searchParams.get('oid');
    const amt = searchParams.get('amt');
    const refId = searchParams.get('refId');

    useEffect(() => {
        handlePaymentVerification();
    }, []);

    const handlePaymentVerification = () => {
        // Handle payment success
        axiosClient
        .post('/esewa-payment', { oid: oid.toString(), amt: amt.toString() })
        .then((response) => {
            setMessage(response.data.message);
            setError(response.data.error);
            setBooking(response.data.booking);

        })
        .catch((error) => {

        });
    };

    return (
        <div className='my-10 flex flex-col justify-between items-center'>
            <div>
                {message && <Typography variant='h5' className='text-green-500 font-thin text-xl my-5 flex items-center'>{message}<FaCheckCircle className='text-xl font-bold ml-3'/></Typography>}{error && <p className='text-red-500 font-thin text-xl my-5 flex items-center'>{error}<BiSolidErrorCircle className='text-xl font-bold ml-3'/></p>}
            </div>
            {Object.keys(booking).length > 0 && (

                <BookingDetails booking={booking} />

            )}
        </div>


    );
};

export default EsewaSuccess;
