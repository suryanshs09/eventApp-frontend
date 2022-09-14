import React from 'react';
import {FormTemplate, FormUtility} from '../../components/FormTemplate';
import { Button, TextField } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import { Box } from '@mui/system';
import eventService from '../../services/EventService';
import { toast } from 'react-toastify';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const initialValues = {
    name: '',
    description: '',
    startDate: null,
    endDate: null,
    fees: '',
    location: '',
    organizerId: '',
};

const EventAdd = () => {
  const {values, handleReset,  handleChange} = FormUtility(initialValues);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    eventService.create(values).then((response) => {
        //console.log(response.data);
        navigate('/events');
        toast.success('event created successfully');
    }).catch((error) => {
        //console.log(error);
        toast.error(error.message);
    });
    //handleReset();
  };

  return (
    <FormTemplate onSubmit={handleSubmit} heading="Add Event">
      <TextField label="Name" variant="standard" sx={{width:'80%', m:1}} name="name" value={values.name} onChange={handleChange} />
      <TextField label="Description" variant="standard" sx={{width:'80%', m:1}} multiline name="description" value={values.description} onChange={handleChange} />
      <DateTimePicker
        label="Start Date"
        value={values.startDate}
        name="startDate"
        onChange={(newValue) => {
          handleChange({target: {name: 'startDate', value: newValue}});
        }}
        renderInput={(params) => <TextField variant="standard" sx={{width:'80%', m:1}} {...params} />}
      />
      <DateTimePicker
        label="End Date"
        value={values.endDate}
        name="endDate"
        onChange={(newValue) => {
          handleChange({target: {name: 'endDate', value: newValue}});
        }}
        renderInput={(params) => <TextField variant="standard" sx={{width:'80%', m:1}} {...params} />}
      />
      <TextField label="fees" variant="standard" sx={{width:'80%', m:1}} name="fees" value={values.fees} onChange={handleChange} />
      <TextField label="Venue" variant="standard" sx={{width:'80%', m:1}} name="location" value={values.location} onChange={handleChange} />
      <TextField label="Organizer's Id" variant="standard" sx={{width:'80%', m:1}} name="organizerId" value={values.organizerId} onChange={handleChange} />
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row-reverse', m:2, p:2 }}>
        <Button variant="text" onClick={handleReset} sx={{m:1}}>Reset</Button>
        <Button variant="outlined" onClick={() => {navigate('/events')}} sx={{m:1}}>Cancel</Button>
        <Button variant="contained" type="submit" sx={{m:1}}>Submit</Button>
      </Box>
    </FormTemplate> 
  );
};

export default EventAdd;
