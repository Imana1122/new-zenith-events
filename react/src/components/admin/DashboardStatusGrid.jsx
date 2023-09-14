import React, { useEffect, useState } from 'react';
import { IoAlbums, IoBagHandle, IoCash, IoCashOutline, IoPeople, IoPeopleOutline, IoTicket } from 'react-icons/io5';
import axiosClient from '../../axios';

export const DashboardStatusGrid = () => {
  const [totalBookings, setTotalBookings] = useState('');
  const [thisMonthBookings, setThisMonthBookings] = useState('');
  const [thisMonthRevenue, setThisMonthRevenue] = useState('');
  const [totalRevenue, setTotalRevenue] = useState('');
  const [totalUsers, setTotalUsers] = useState('');
  const [thisMonthUsers, setThisMonthUsers] = useState('');
  const [totalEvents, setTotalEvents] = useState('');
  const [thisMonthEvents, setThisMonthEvents] = useState('');


  // Fetch data for total and this month's revenue
  useEffect(() => {
    axiosClient
      .get('/getDashboardDetails') // Replace with the correct API endpoint
      .then((response) => {
        setTotalBookings(response.data.bookings)
        setThisMonthBookings(response.data.thisMonthBookings)
        setTotalUsers(response.data.users)
        setThisMonthUsers(response.data.thisMonthUsers)
        setTotalEvents(response.data.events)
        setThisMonthEvents(response.data.thisMonthEvents)
        setTotalRevenue(response.data.totalYearlyRevenue[0].revenue)
        setThisMonthRevenue(response.data.totalMonthlyRevenue[0].revenue)
      })
      .catch((error) => {
        console.error(error);
      });
  }, '');


  return (
    <div className='flex gap-4 w-full h-full flex-wrap'>
      <BoxWrapper>
        <div className='rounded-full h-12 w-12 flex items-center justify-center bg-sky-500'>
          <IoTicket className='text-2xl text-white' />
        </div>
        <div>
          <span className='text-sm text-gray-500 font-light'>Total Tickets</span>
          <div className='flex items-center xl:flex-row flex-col'>
            <strong className='text-md text-gray-700 font-semibold'>333</strong>
            <span className='text-sm text-green-500 pl-2'>+234</span>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className='rounded-full h-12 w-12 flex items-center justify-center bg-sky-500'>
          <IoCash className='text-2xl text-white' />
        </div>
        <div>
          <span className='text-sm text-gray-500 font-light'>Monthly Revenue</span>
          <div className='flex items-center xl:flex-row flex-col'>
            <strong className='text-md text-gray-700 font-semibold'>Rs.{totalRevenue}</strong>
            <span className='text-sm text-green-500 pl-2'>+Rs.{thisMonthRevenue}</span>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className='rounded-full h-12 w-12 flex items-center justify-center bg-sky-500'>
          <IoBagHandle className='text-2xl text-white' />
        </div>
        <div>
          <span className='text-sm text-gray-500 font-light'>Total Bookings</span>
          <div className='flex items-center xl:flex-row flex-col'>
            <strong className='text-md text-gray-700 font-semibold'>{totalBookings}</strong>
            <span className='text-sm text-green-500 pl-2'>+{thisMonthBookings}</span>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className='rounded-full h-12 w-12 flex items-center justify-center bg-sky-500'>
          <IoAlbums className='text-2xl text-white' />
        </div>
        <div>
          <span className='text-sm text-gray-500 font-light'>Total Events</span>
          <div className='flex items-center xl:flex-row flex-col'>
            <strong className='text-md text-gray-700 font-semibold'>{totalEvents}</strong>
            <span className='text-sm text-green-500 pl-2'>+{thisMonthEvents}</span>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className='rounded-full h-12 w-12 flex items-center justify-center bg-sky-500'>
          <IoPeople className='text-2xl text-white' />
        </div>
        <div>
          <span className='text-sm text-gray-500 font-light'>Total Users</span>
          <div className='flex items-center xl:flex-row flex-col'>
            <strong className='text-md text-gray-700 font-semibold'>{totalUsers}</strong>
            <span className='text-sm text-green-500 pl-2'>+{thisMonthUsers}</span>
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
};

function BoxWrapper({ children }) {
  return <div className='bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center'>{children}</div>;
}
