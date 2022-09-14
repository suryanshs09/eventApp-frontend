import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Card, Paper, Skeleton, Typography, Grid, CardContent, CardActions } from '@mui/material';
import { useEffect } from 'react';
import organizerService from '../../services/OrganizerService';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';

const SingleOrganizer = () => {
    const { organizerId } = useParams();
    const navigate = useNavigate();
    const [organizer, setOrganizer] = useState({});
    const [loading, setLoading] = useState(true);
    const[events, setEvents] = useState([]);

    useEffect(() => {
        organizerService.get(organizerId).then((response) => {
            setOrganizer(response.data);
        }).catch((error) => {
            console.log(error);
        });
        organizerService.getEvents(organizerId).then((response) => {
            setEvents(response.data);
        }).catch((error) => {
            console.log(error);
        });
        setLoading(false);
    }, [organizerId]);
    return ( 
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', m:'auto', p:3 }}>
            {
                loading ? 
                    <Skeleton  variant="text" width={"70%"} sx={{ fontSize: '30rem' }}/>
                :
                    <Paper sx={{m:'auto', p:2, width:'70%'}}>
                    <Typography variant="h4">{organizer.username}</Typography>
                    <Typography variant="subtitle1" sx={{m:1}}>General Info</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'left', flexDirection: 'column', m:1 }}>
                        <Typography variant="subtitle2">{`Email id: ${organizer.email}`}</Typography>
                        <Typography variant="subtitle2">{`Phone no: ${organizer.contact}`}</Typography>
                        <Typography variant="subtitle2">{`Organized: ${events.length}`}</Typography>
                    </Box>
                    {
                        events.length > 0 ?
                            <>
                                <Typography variant="subtitle1" sx={{m:1}}>Events</Typography>
                                <Grid container spacing={2}>
                                    {
                                        events.map((event) => (
                                            
                                            <Grid item xs={16} sm={6} md={4} lg={3} key={event.id}>
                                                {console.log(event)}
                                                <Card sx={{m:1, p:1}} elevation={3}>
                                                    <CardContent>
                                                        <Typography variant="h6">{event.name}</Typography>
                                                        <Typography variant="subtitle2">{event.description}</Typography>
                                                    </CardContent>
                                                    <CardActions>
                                                        <Button variant="text" onClick={() => {navigate(`/events/${event.id}`)}}>View</Button>
                                                        <Button variant="text" onClick={() => {navigate(`/events/update/${event.id}`)}}><EditIcon /></Button>
                                                    </CardActions>
                                                </Card>
                                            </Grid>
                                        ))    
                                    }
                                </Grid>
                            </>
                        :
                            <Typography variant="subtitle1" sx={{m:1}}>No events organized</Typography>
                    }
                    <Button variant="contained" onClick={() => {navigate(`/organizers/update/${organizerId}`)}} sx={{m:1}} startIcon={<EditIcon />}>Update</Button>    
                    <Button variant="outlined" onClick={() => {navigate('/organizers')}} sx={{m:1}}>Go Back to Organizers</Button>
                </Paper> 
            }    
        </Box>
    );
};

export default SingleOrganizer;
