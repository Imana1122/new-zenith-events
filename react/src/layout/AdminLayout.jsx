// pages/AdminLayout.js

import React, { useEffect, useState } from 'react';
import { Sidebar } from '../components/Admin/shred/Sidebar';
import { Header } from '../components/Admin/Header';
import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contents/ContextProvider';
import axiosClient from '../../../react/src/axios';
import { motion } from "framer-motion";

export const AdminLayout = () => {
  // Get userToken and currentUser from the context
  const { currentUser, userToken, setCurrentUser, setUserToken } = useStateContext();


  useEffect(() => {
    // Set current user from local storage when the component mounts
    setCurrentUser(JSON.parse(localStorage.getItem('USER')));
  }, []);


  // If the user is not logged in (userToken is empty), redirect to the login page
  if (!userToken) {
    return <Navigate to="login" />;
  }

  // Function to handle user logout
  const logout = (ev) => {
    ev.preventDefault();
    axiosClient.post('/logout')
      .then(res => {
        setCurrentUser({});
        setUserToken(null);
      });
  };

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const handleSidebarToggle = () => {
      setIsMobileSidebarOpen(!isMobileSidebarOpen);
    };


  return (
    <div className='flex flex-row bg-neutral-100 md:h-screen md:w-full sm:h-full sm:w-full lg:w-screen lg-h-screen'>
        {/* Sidebar component */}
        <motion.div
        className={`${
          isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } absolute inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out md:hidden`}
        initial={false}
        animate={{
          translateX: isMobileSidebarOpen ? 0 : "-100%",
        }}
      >
        <Sidebar
          logout={logout}
          handleSidebarToggle={handleSidebarToggle}
        />
      </motion.div>

      <div className='hidden md:block'>
        <Sidebar logout={logout}/>
      </div>

      <div className='flex-1 h-screen flex flex-col'>
            {/* Header component */}
            <Header logout={logout} currentUser={currentUser} onSidebarToggle={handleSidebarToggle} />

        <div className='min-h-0 overflow-auto'>
          {/* Outlet to render child routes */}
          {<Outlet />}
        </div>
      </div>
    </div>
  );
};
