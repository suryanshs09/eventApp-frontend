import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Card, Paper, Skeleton, Typography, Grid, CardContent, CardActions, Stack, Tabs, Tab } from '@mui/material';
import { useEffect } from 'react';
import eventService from '../../services/EventService';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { toast } from 'react-toastify';
import { parse, toHours } from 'duration-fns';
import { format, parseISO } from 'date-fns';


const SingleEvent = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState({});
    const [loading, setLoading] = useState(true);
    const [guests, setGuests] = useState([]);
    //const [services, setServices] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [tabNumber, setTabNumber] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabNumber(newValue);
    };

    useEffect(() => {

        const fetchData = () => {
            axios.all([
                eventService.get(eventId),
                eventService.getGuests(eventId),
                eventService.getServices(eventId),
                eventService.getReviews(eventId)
            ]).then(axios.spread((...allData) => {
                setEvent(allData[0].data);
                setGuests(allData[1].data);
                //setServices(allData[2].data);
                setReviews(allData[3].data);
                setLoading(false);
            })).catch((error) => {
                console.log(error);
                toast.error(error.message);
            });
        };

        fetchData();
        
    }, [eventId]);
    return ( 
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', m:'auto', p:3 }}>
            {
                loading ? 
                    <Skeleton  variant="text" width={"70%"} sx={{ fontSize: '30rem' }}/>
                :
                    <Paper sx={{m:'auto', p:2, width:'70%'}}>
                    <Typography variant="h4">{event.name}</Typography>
                    <Typography variant="subtitle1" sx={{m:1}}>Description</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'left', flexDirection: 'column', m:1 }}>
                        <Typography variant="subtitle2">{event.description}</Typography>
                    </Box>
                    <Typography variant="subtitle1" sx={{m:1}}>Event Details</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'left', flexDirection: 'column', m:1 }}>
                        {event.fees > 0 ? <Typography variant="subtitle2">{`Fees: ${event.fees}`}</Typography> : null}
                        <Typography variant="subtitle2">{`Venue: ${event.location}`}</Typography>
                        <Typography variant="subtitle2">{`Start Date: ${format(parseISO(event.startDate), "dd-MM-yyyy")}`}</Typography>
                        <Typography variant="subtitle2">{`End Date: ${format(parseISO(event.endDate), "dd-MM-yyyy")}`}</Typography>
                        <Typography variant="subtitle2">{`Duration: ${toHours(parse(event.duration))} hours`}</Typography>
                        <Typography variant="subtitle2">{`Organizer: ${event.organizerDetails.username}`}</Typography>
                    </Box>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={tabNumber} onChange={handleTabChange}>
                                <Tab label="Guests" />
                                <Tab label="Reviews" />
                                {/* <Tab label="Services" /> */}
                            </Tabs>
                        </Box>
                        <Box hidden={tabNumber !== 0}>
                            {
                                tabNumber === 0 && (
                                <Box sx={{ p: 3 }}>
                                    <Stack sx={{justifyContent: 'left', alignItems: 'left'}}>
                                        {
                                            guests.length > 0 ?
                                                <>
                                                    <Grid container spacing={2}>
                                                        {
                                                            guests.map((guest) => (
                                                                <Grid item xs={16} sm={6} md={4} lg={3} key={guest.id}>
                                                                    {console.log(guest)}
                                                                    <Card sx={{m:1, p:1}} elevation={3}>
                                                                        <CardContent>
                                                                            <Typography variant="h6">{guest.username}</Typography>
                                                                            <Typography variant="subtitle2">{guest.email}</Typography>
                                                                        </CardContent>
                                                                        <CardActions>
                                                                            <Button variant="text" onClick={() => {navigate(`/guests/${guest.id}`)}}>View</Button>
                                                                            {/* <Button variant="text" onClick={() => {navigate(`/guests/update/${guest.id}`)}}><EditIcon /></Button> */}
                                                                        </CardActions>
                                                                    </Card>
                                                                </Grid>
                                                            ))    
                                                        }
                                                    </Grid>
                                                </>
                                            :
                                                <Typography variant="subtitle1" sx={{m:1}}>No guests registered</Typography>
                                        }
                                        <Button variant="text" onClick={() => {navigate(`/events/register/${eventId}`)}} sx={{m:1}} startIcon={<AddIcon />}>Register Guest</Button>
                                    </Stack>
                                </Box>
                            )}
                        </Box>
                        <Box role="tabpanel" hidden={tabNumber !== 1}>
                            {
                                tabNumber === 1 && (
                                <Box sx={{ p: 3 }}>
                                    <Stack>
                                    {
                                            reviews.length > 0 ?
                                                <>
                                                    <Grid container spacing={2}>
                                                        {
                                                            reviews.map((review) => (
                                                                
                                                                <Grid item xs={16} sm={6} md={4} lg={3} key={review.id}>
                                                                    {console.log(review)}
                                                                    <Card sx={{m:1, p:1}} elevation={3}>
                                                                        <CardContent>
                                                                            <Typography variant="h6">{review.review}</Typography>
                                                                            <Typography variant="subtitle2">{review.guest.username}</Typography>
                                                                        </CardContent>
                                                                        {/* <CardActions>
                                                                            <Button variant="text" onClick={() => {navigate(`/guests/${review.id}`)}}>View</Button>
                                                                            <Button variant="text" onClick={() => {navigate(`/guests/update/${guest.id}`)}}><EditIcon /></Button>
                                                                        </CardActions> */}
                                                                    </Card>
                                                                </Grid>
                                                            ))    
                                                        }
                                                    </Grid>
                                                </>
                                            :
                                                <Typography variant="subtitle1" sx={{m:1}}>No reviews</Typography>
                                        }
                                        <Button variant="text" onClick={() => {navigate(`/events/addReview/${eventId}`)}} sx={{m:1}} startIcon={<AddIcon />}>Add Review</Button>
                                    </Stack>
                                </Box>
                            )}
                        </Box>
                        {/* <Box role="tabpanel" hidden={tabNumber !== 2}>
                            {
                                tabNumber === 2 && (
                                <Box sx={{ p: 3 }}>
                                    <Stack sx={{justifyContent: 'left', alignItems: 'left'}}>
                                        {
                                            guests.length > 0 ?
                                                <>
                                                    <Typography variant="subtitle1" sx={{m:1}}>Guests</Typography>
                                                    <Grid container spacing={2}>
                                                        {
                                                            guests.map((guest) => (
                                                                
                                                                <Grid item xs={16} sm={6} md={4} lg={3} key={guest.id}>
                                                                    {console.log(guest)}
                                                                    <Card sx={{m:1, p:1}}>
                                                                        <CardContent>
                                                                            <Typography variant="h6">{guest.username}</Typography>
                                                                            <Typography variant="subtitle2">{guest.email}</Typography>
                                                                        </CardContent>
                                                                        <CardActions>
                                                                            <Button variant="text" onClick={() => {navigate(`/guests/${guest.id}`)}}>View</Button>
                                                                            // <Button variant="text" onClick={() => {navigate(`/guests/update/${guest.id}`)}}><EditIcon /></Button>
                                                                        </CardActions>
                                                                    </Card>
                                                                </Grid>
                                                            ))    
                                                        }
                                                    </Grid>
                                                </>
                                            :
                                                <Typography variant="subtitle1" sx={{m:1}}>No guests registered</Typography>
                                        }
                                        <Button variant="text" onClick={() => {navigate(`/events/register/${eventId}`)}} sx={{m:1}} startIcon={<AddIcon />}>Register Guest</Button>
                                    </Stack>
                                </Box>
                            )}
                        </Box> */}
                    </Box>
                    <Button variant="contained" onClick={() => {navigate(`/events/update/${eventId}`)}} sx={{m:1}} startIcon={<EditIcon />}>Update</Button>    
                    <Button variant="outlined" onClick={() => {navigate('/events')}} sx={{m:1}}>Go Back to Events</Button>
                </Paper> 
            }    
        </Box>
    );
};

export default SingleEvent;

