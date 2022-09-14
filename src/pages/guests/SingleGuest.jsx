import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Card, Paper, Skeleton, Typography, Grid, CardContent, CardActions } from '@mui/material';
import { useEffect } from 'react';
import guestService from '../../services/GuestService';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';

const SingleGuest = () => {
    const { guestId } = useParams();
    const navigate = useNavigate();
    const [guest, setGuest] = useState({});
    const [loading, setLoading] = useState(true);
    const[events, setEvents] = useState([]);

    useEffect(() => {
        guestService.get(guestId).then((response) => {
            setGuest(response.data);
        }).catch((error) => {
            console.log(error);
        });
        guestService.getEvents(guestId).then((response) => {
            setEvents(response.data);
        }).catch((error) => {
            console.log(error);
        });
        setLoading(false);
    }, [guestId]);
    return ( 
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', m:'auto', p:3 }}>
            {
                loading ? 
                    <Skeleton  variant="text" width={"70%"} sx={{ fontSize: '30rem' }}/>
                :
                    <Paper sx={{m:'auto', p:2, width:'70%'}}>
                    <Typography variant="h4">{guest.username}</Typography>
                    <Typography variant="subtitle1" sx={{m:1}}>General Info</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'left', flexDirection: 'column', m:1 }}>
                        <Typography variant="subtitle2">{`Email id: ${guest.email}`}</Typography>
                        <Typography variant="subtitle2">{`Phone no: ${guest.contact}`}</Typography>
                        <Typography variant="subtitle2">{`Participated: ${events.length}`}</Typography>
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
                            <Typography variant="subtitle1" sx={{m:1}}>Not participated in any event</Typography>
                    }
                    <Button variant="contained" onClick={() => {navigate(`/guests/update/${guestId}`)}} sx={{m:1}} startIcon={<EditIcon />}>Update</Button>    
                    <Button variant="outlined" onClick={() => {navigate('/guests')}} sx={{m:1}}>Go Back to guests</Button>
                </Paper> 
            }    
        </Box>
    );
};

export default SingleGuest;
