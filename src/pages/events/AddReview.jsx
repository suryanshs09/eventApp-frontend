import { TextField } from '@mui/material';
import React from 'react';
import {FormTemplate, FormUtility} from '../../components/FormTemplate';
import {Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import { Box } from '@mui/system';
import reviewService from '../../services/ReviewService';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const initialValues = {
    id: '',
};

const AddReview = () => {
    
    const {values, handleReset,  handleChange} = FormUtility(initialValues);
    const navigate = useNavigate();
    const { eventId } = useParams();

    const handleSubmit = (e) => {
        e.preventDefault();
        //console.log(values);
        reviewService.create(eventId, values).then((response) => {
            console.log(response.data);
            navigate(`/events/${eventId}`);
            toast.success('Review added successfully');
        }).catch((error) => {
            //console.log(error);
            toast.error(error.message);
        });
        //handleReset();
    };
    return (
        <FormTemplate onSubmit={handleSubmit} heading="Register Guest">
                <TextField label="Guest's Id" variant="standard" sx={{width:'80%', m:1}} name="userId" value={values.userId} onChange={handleChange} />
                <TextField label="Review" variant="standard" sx={{width:'80%', m:1}} multiline name="review" value={values.review} onChange={handleChange} />
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row-reverse', m:2, p:2 }}>
                    <Button variant="text" onClick={handleReset} sx={{m:1}}>Reset</Button>
                    <Button variant="outlined" onClick={() => {navigate(`/events/${eventId}`)}} sx={{m:1}}>Cancel</Button>
                    <Button variant="contained" type="submit" sx={{m:1}}>Submit</Button>
                </Box>
        </FormTemplate>
    );
};

export default AddReview;