import { TextField } from '@mui/material';
import React from 'react';
import {FormTemplate, FormUtility} from '../../components/FormTemplate';
import PasswordField from '../../components/PasswordField';
import {Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import { Box } from '@mui/system';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import guestService from '../../services/GuestService';
import { toast } from 'react-toastify';

const initialValues = {
    username: '',
    password: '',
    email: '',
    contact: '',
    dob: null,
};


const GuestAdd = () => {
  const {values, handleReset,  handleChange} = FormUtility(initialValues);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(values);
        guestService.create(values).then((response) => {
            //console.log(response.data);
            navigate('/guests');
            toast.success('Guest created successfully');
        }).catch((error) => {
            //console.log(error);
            toast.error(error.message);
        });
        //handleReset();
  };
  return (
        <FormTemplate onSubmit={handleSubmit} heading="Add Guest">
                <TextField label="Name" variant="standard" sx={{width:'80%', m:1}} name="username" value={values.username} onChange={handleChange} />
                <PasswordField label="Password" variant="standard" sx={{width:'80%', m:1}} name="password" value={values.password} onChange={handleChange} />
                <TextField label="Email" type="email" variant="standard" sx={{width:'80%', m:1}} name="email" value={values.email} onChange={handleChange} />
                <TextField label="Phone" variant="standard" sx={{width:'80%', m:1}} name="contact" value={values.contact} onChange={handleChange} />
                <DatePicker
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

export default GuestAdd;