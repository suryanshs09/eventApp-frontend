import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';


const PasswordField = (props) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

  return (
    <TextField
    type={showPassword ? 'text' : 'password'}   
    InputProps={{
        endAdornment: 
        <InputAdornment position="end">
            <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}> {showPassword ? <Visibility /> : <VisibilityOff />} </IconButton>
        </InputAdornment>
      }}
      { ...props }  />
  );
};

export default PasswordField;