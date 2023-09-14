import React, { useEffect, useState } from 'react';
import axiosClient from '../../axios';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Tab } from '@headlessui/react';
import { useStateContext } from '../../contents/ContextProvider';
import { highlightSearchQuery } from '../../utility/HighlightText';
import { format } from 'date-fns';
import Modal from '../core/Modal';
import { CiWarning } from 'react-icons/ci';
import { TrashIcon } from '@heroicons/react/24/outline';
import TButton from '../core/TButton';
import toast from 'react-hot-toast';

const RecentBookings = () => {
    const {searchQuery} = useStateContext();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [bookingIdToDelete, setBookingIdToDelete] = useState(null);

    const [bookings, setBookings] = useState({});
    useEffect(() => {
        if (searchQuery) {
        axiosClient.get('/search/bookings',{ params: { query: searchQuery } })
            .then((response) => {
            // Update the 'data' state with the search results
            setBookings(response.data);
            })
            .catch((error) => {
            });
        }else{
            axiosClient
        .get('/bookings') // Replace with the correct API endpoint
        .then((response) => {
            setBookings(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
        }
    }, [searchQuery]);

    const handleDelete = (id) => {
        axiosClient
          .delete(`/deleteBooking/${id}`)
          .then(() => {
            search();
            setIsModalOpen(false);
          })
          .catch((error) => {
            setIsModalOpen(false);
            if(error.response.data.error){
                toast.error(error.response.data.error);
            }
          });
      };

      const onDeleteClick = (eventId) => {
        setIsModalOpen(true);
        setBookingIdToDelete(eventId);
      };


  return (
    <div className='flex flex-col justify-between items-start bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1'>
      <h2 className='font-semibold text-xl mb-5'>Recent Bookings</h2>
      {/* Render bookings in tab format */}
      <div>
        {Object.keys(bookings).length > 0 ? (
          <div className="block px-1 pb-16 sm:px-0 w-full">
            <Tab.Group>
              {/* Tab List */}
              <Tab.List className="flex justify-between rounded-xl bg-blue-900/20 p-1">
                {Object.keys(bookings).map((booking) => (
                  <Tab
                    key={booking}
                    className={({ selected }) =>
                      classNames(
                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                        selected
                          ? 'bg-white shadow'
                          : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                      )
                    }
                  >
                    {booking}
                  </Tab>
                ))}
              </Tab.List>

              {/* Tab Panels */}
              <Tab.Panels className="mt-2">
                {Object.values(bookings).map((bookings, idx) => (
                  <Tab.Panel
                    key={idx}
                    className={classNames(
                      'rounded-xl bg-white p-3',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                    )}
                  >
                    {/* Table to display bookings */}
                    <table className="w-full text-gray-700 border border-collapse border-gray-200 rounded-sm">
                      <thead className="bg-gray-400">
                        <tr>
                          <th className="border border-gray-200 p-2">ID</th>
                          <th className="border border-gray-200 p-2">EventID</th>
                          <th className="border border-gray-200 p-2">No. Of People</th>
                          <th className="border border-gray-200 p-2">Total Amount</th>
                          <th className="border border-gray-200 p-2">Booked Date</th>
                          <th className="border border-gray-200 p-2">eSewa Status</th>
                          <th className="border border-gray-200 p-2">Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings && bookings.length > 0 ? (
                            bookings.map((booking) => (
                            <tr key={booking.id}>
                                <td className="border border-gray-200 p-2">
                                <div dangerouslySetInnerHTML={{ __html: highlightSearchQuery(booking.id.toString(), searchQuery) }} />
                                </td>

                                <td className="border border-gray-200 p-2">
                                <Link to={`#`} className="cursor-pointer text-sky-500">
                                    <div dangerouslySetInnerHTML={{ __html: highlightSearchQuery(booking.eventId.toString(), searchQuery) }} />
                                </Link>
                                </td>
                                <td className="border border-gray-200 p-2">{booking.noOfPeople}</td>
                                <td className="border border-gray-200 p-2">NRs. {booking.totalAmount}</td>
                                <td className="border border-gray-200 p-2">{format(new Date(booking.created_at), 'yyyy-MM-dd HH:mm')}</td>
                                <td
                                className={classNames(
                                    'border border-gray-200 p-2',
                                    Number(booking.esewa_status) === 1 ? 'text-green-500' : 'text-red-500'
                                )}
                                >
                                {Number(booking.esewa_status) === 1 ? 'True' : booking.esewa_status}
                                </td>
                                <td>
                                    <div className="flex items-center">
                                    {booking.id && (
                                      <TButton
                                        onClick={() => { onDeleteClick(booking.id) }}
                                        circle
                                        color="red"
                                      >
                                        <TrashIcon className="w-5 h-5" />
                                      </TButton>
                                    )}
                                  </div>
                                </td>
                            </tr>
                            ))
                        ) : (
                            <tr>
                            <td className="border border-gray-200 p-2" colSpan={7}>
                                No bookings available
                            </td>
                            </tr>
                        )}
                      </tbody>

                    </table>
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>

            {/* Modal for delete confirmation */}
            <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <div className="p-4">
                {/* Add a focusable element (e.g., a button) for initial focus */}
                <button className="hidden" autoFocus />
                <p className="flex items-center">
                  <span className="text-red-500 font-bold text-4xl mr-5">
                    <CiWarning />
                  </span>
                  Are you sure you want to delete this booking?
                </p>
                <div className="flex justify-end mt-4">
                  <button
                    className="mr-2 px-4 py-2 bg-red-500 text-white rounded-md"
                    onClick={() => handleDelete(bookingIdToDelete)}
                  >
                    Yes, Delete
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        ) : (
          <p className='text-xl my-5 text-green-700 font-light'>Loading......</p>
        )}
      </div>
    </div>
  );
};

export default RecentBookings;
