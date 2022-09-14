import { TextField } from '@mui/material';
import React, {useState, useEffect} from 'react';
import {FormTemplate, FormUtility} from '../../components/FormTemplate';
import {Button} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import { Box } from '@mui/system';
import organizerService from '../../services/OrganizerService';
import { toast } from 'react-toastify';


const OrganizerUpdate = () => {
    const { organizerId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const {values, setValues, handleReset,  handleChange} = FormUtility({});

    useEffect(() => {
        organizerService.get(organizerId).then((response) => {
            //console.log(response.data);
            setValues(response.data);
            setLoading(false);
            //toast.success('Organizer loaded successfully');
        }
        ).catch((error) => {
            console.log(error);
            toast.error(error.message);
        });
    }, [organizerId, setValues]);

    const handleSubmit = (event) => {
        event.preventDefault();
        //console.log(values);
        organizerService.update(values.id, values).then((response) => {
            //console.log(response.data);
            toast.success('Organizer updated successfully');
            navigate('/organizers');
        }
        ).catch((error) => {
            //console.log(error);
            toast.error(error.message);
        });
    };


    return (
        <FormTemplate onSubmit={handleSubmit} heading="Update Organizer">
                <TextField label="Name" variant="standard" sx={{width:'80%', m:1}} name="username" value={loading ? "loading..." : values.username} onChange={handleChange} />
                <TextField label="Password" variant="standard" sx={{width:'80%', m:1}} name="password" value={loading ? "loading..." : values.password} onChange={handleChange} />
                <TextField label="Email" type="email" variant="standard" sx={{width:'80%', m:1}} name="email" value={loading ? "loading..." : values.email} onChange={handleChange} />
                <TextField label="Phone" variant="standard" sx={{width:'80%', m:1}} name="contact" value={loading ? "loading..." : values.contact} onChange={handleChange} />
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row-reverse', m:2, p:2 }}>
                    <Button variant="text" onClick={handleReset} sx={{m:1}}>Reset</Button>
                    <Button variant="outlined" onClick={() => {navigate('/organizers')}} sx={{m:1}}>Cancel</Button>
                    <Button variant="contained" type="submit" sx={{m:1}}>Submit</Button>
                </Box>
        </FormTemplate>
    );
};

export default OrganizerUpdate;