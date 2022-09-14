import { TextField } from '@mui/material';
import React from 'react';
import {FormTemplate, FormUtility} from '../../components/FormTemplate';
import {Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import { Box } from '@mui/system';
import eventService from '../../services/EventService';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const initialValues = {
    id: '',
};

const RegisterGuest = () => {
    
    const {values, handleReset,  handleChange} = FormUtility(initialValues);
    const navigate = useNavigate();
    const { eventId } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(values);
        eventService.addGuest(eventId, values).then((response) => {
            console.log(response.data);
            navigate(`/events/${eventId}`);
            toast.success('Registered successfully');
        }).catch((error) => {
            //console.log(error);
            toast.error(error.message);
        });
        //handleReset();
    };
    return (
        <FormTemplate onSubmit={handleSubmit} heading="Register Guest">
                <TextField label="Guest's Id" variant="standard" sx={{width:'80%', m:1}} name="id" value={values.id} onChange={handleChange} />
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row-reverse', m:2, p:2 }}>
                    <Button variant="text" onClick={handleReset} sx={{m:1}}>Reset</Button>
                    <Button variant="outlined" onClick={() => {navigate(`/events/${eventId}`)}} sx={{m:1}}>Cancel</Button>
                    <Button variant="contained" type="submit" sx={{m:1}}>Submit</Button>
                </Box>
        </FormTemplate>
    );
};

export default RegisterGuest;