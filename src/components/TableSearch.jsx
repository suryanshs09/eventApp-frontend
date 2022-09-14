import React, { useState } from 'react';
import { useAsyncDebounce } from 'react-table';
import { TextField } from '@mui/material';

const TableSearch = ({filter, setFilter}) => {
    const [value, setValue] = useState(filter);
    const onChange = useAsyncDebounce(value => {
        setFilter(value || undefined);
    }, 500);

  return (
    <TextField 
        label="Search" 
        variant="standard" 
        sx={{width:'20%', m:1}} 
        value={value || ''} 
        onChange={(e) => {
            setValue(e.target.value); 
            onChange(e.target.value)
        }} 
    />
  );
};

export default TableSearch;