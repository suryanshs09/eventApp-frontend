import { TextField } from '@mui/material';
import React, {useState, useEffect} from 'react';
import {FormTemplate, FormUtility} from '../../components/FormTemplate';
import {Button} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import { Box } from '@mui/system';
import guestService from '../../services/GuestService';
import { toast } from 'react-toastify';
import { DateTimePicker } from '@mui/x-date-pickers';


const GuestUpdate = () => {
    const { guestId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const {values, setValues, handleReset,  handleChange} = FormUtility({});

    useEffect(() => {
        guestService.get(guestId).then((response) => {
            //console.log(response.data);
            setValues(response.data);
            setLoading(false);
            //toast.success('Organizer loaded successfully');
        }
        ).catch((error) => {
            console.log(error);
            toast.error(error.message);
        });
    }, [guestId, setValues]);

    const handleSubmit = (event) => {
        event.preventDefault();
        //console.log(values);
        guestService.update(values.id, values).then((response) => {
            //console.log(response.data);
            toast.success('Guest updated successfully');
            navigate('/guests');
        }
        ).catch((error) => {
            //console.log(error);
            toast.error(error.message);
        });
    };


    return (
        <FormTemplate onSubmit={handleSubmit} heading="Update Guest">
                <TextField label="Name" variant="standard" sx={{width:'80%', m:1}} name="username" value={loading ? "loading..." : values.username} onChange={handleChange} />
                <TextField label="Password" variant="standard" sx={{width:'80%', m:1}} name="password" value={loading ? "loading..." : values.password} onChange={handleChange} />
                <TextField label="Email" type="email" variant="standard" sx={{width:'80%', m:1}} name="email" value={loading ? "loading..." : values.email} onChange={handleChange} />
                <TextField label="Phone" variant="standard" sx={{width:'80%', m:1}} name="contact" value={loading ? "loading..." : values.contact} onChange={handleChange} />
                <DateTimePicker
                  label="Date of Birth"
                  value={values.dob}
                  name="dob"
                  onChange={(newValue) => {
                    handleChange({target: {name: 'dob', value: newValue}});
                  }}
                  renderInput={(params) => <TextField variant="standard" sx={{width:'80%', m:1}} {...params} />}
                />
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row-reverse', m:2, p:2 }}>
                    <Button variant="text" onClick={handleReset} sx={{m:1}}>Reset</Button>
                    <Button variant="outlined" onClick={() => {navigate('/guests')}} sx={{m:1}}>Cancel</Button>
                    <Button variant="contained" type="submit" sx={{m:1}}>Submit</Button>
                </Box>
        </FormTemplate>
    );
};

export default GuestUpdate;