import { Button } from '@mui/material';
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/system';
import eventService from '../../services/EventService';
import { toast } from 'react-toastify';
import TableTemplate from '../../components/TableTemplate';
import { EventColumns } from '../../components/ColumnHeaders';

const EventIndex = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    eventService.getAll().then((response) => {
        //console.log(response.data);
        setData(response.data);
        setLoading(false);
        //toast.success("Events loaded successfully!");
    }).catch((error) => {
        //console.log(error);
        toast.error(error.message);
    });
  }, []);

  const handleDelete = (id) => {
    eventService.remove(id).then((response) => {
        //console.log(response.data);
        setData(data.filter((item) => item.id !== id));
        //console.log("Table Data:", data);
        toast.success('Event deleted successfully');
    }).catch((error) => {
        //console.log(error);
        toast.error(error.message);
    });
  };
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', m:2 }}>
            <h1>Events</h1>
            <Box sx={{ p:1, m:1, flexDirection: 'row' }}>
                <Button variant="contained" onClick={() => {navigate('/events/add')}} sx={{m:1}} endIcon={<AddIcon />}>Create</Button>
                <Button variant="outlined" onClick={() => {navigate('/')}} sx={{m:1}}>Go Back Home</Button>
            </Box>
            <TableTemplate columns={EventColumns} data={data} path="/events" handleDelete={handleDelete} loading={loading}/>    
        </Box>
        
    );
};

export default EventIndex;
