import React from 'react';
import { Outlet } from 'react-router-dom';

const GuestSharedLayout = () => {
  return (
    <>
        {/* <h1>Guest Shared Layout</h1> */}
        <Outlet />
    </>
  );
};

export default GuestSharedLayout;
