// pages/AdminLayout.js

import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useStateContext } from '../contents/ContextProvider';

export const DefaultLayout = () => {
  // Get userToken and currentUser from the context
  const { userToken } = useStateContext();





  // If the user is not logged in (userToken is empty), redirect to the login page
  if (userToken) {
    return <Navigate to="/" />;
  }



  return (
          <div>
            <Outlet/>
          </div>

  );
};
