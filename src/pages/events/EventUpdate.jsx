import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { FormUtility, FormTemplate } from '../../components/FormTemplate';
import eventService from '../../services/EventService';
import { toast } from 'react-toastify';

const initialValues = {
    name: '',
    description: '',
    startDate: null,
    endDate: null,
    fees: '',
    location: '',
    organizerId: '',
    organizerDetails: {
        id: '',
    },
};

const EventUpdate = () => {
  const { values, setValues, handleChange } = FormUtility(initialValues);
  const navigate = useNavigate();
  const { eventId } = useParams();
  
  useEffect(() => {
        eventService.get(eventId).then((response) => {
            //console.log(response.data);
            setValues(response.data);
        }).catch((error) => {
            //console.log(error);
            toast.error(error.message);
        });
  }, [eventId, setValues]);

  
  const handleSubmit = (e) => {
        e.preventDefault();
        //console.log("update event Values", values);
        eventService.update(eventId, values).then((response) => {
            //console.log(response.data);
            navigate('/events');
            toast.success('event updated successfully');
        }).catch((error) => {
            //console.log(error);
            toast.error(error.message);
        });
        //handleReset();
  };
  return (
    <FormTemplate onSubmit={handleSubmit} heading="Update Event">
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
        <TextField label="Location" variant="standard" sx={{width:'80%', m:1}} name="location" value={values.location} onChange={handleChange} />
        <TextField inputProps={{ readOnly: true }} label="Organizer's Id" variant="standard" sx={{width:'80%', m:1}} name="organizerDetails.id" value={values.organizerDetails.id} onChange={handleChange} />
        <Box sx={{display:'flex', justifyContent:'center', m:1}}>
            <Button variant="contained" type="submit" sx={{m:1}}>Update</Button>
            <Button variant="outlined" onClick={() => {navigate('/events')}} sx={{m:1}}>Cancel</Button>
        </Box>
    </FormTemplate>
  );
};

export default EventUpdate;