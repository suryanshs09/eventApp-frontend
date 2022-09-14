import { Button } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';

const Error = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', m:2 }}>
      <h1>404</h1>
      <h3>Error: Page not Found</h3>
      <Button variant="contained" color="error" onClick={() => {navigate('/')}} sx={{m:1}}>Go Back Home</Button>
    </Box>
  )
}

export default Error;
