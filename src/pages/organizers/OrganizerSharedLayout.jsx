import React from 'react';
import { Outlet } from 'react-router-dom';

const OrganizerSharedLayout = () => {
  return (
    <>
      {/* <h1>Organizer Shared Layout</h1> */}
      <Outlet />
    </>
  );
};

export default OrganizerSharedLayout;
