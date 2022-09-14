import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import TableTemplate from '../../components/TableTemplate';
import {OrganizerColumns} from '../../components/ColumnHeaders';
import organizerService from '../../services/OrganizerService';
import { toast } from 'react-toastify';


const OrganizerIndex = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        organizerService.getAll().then((response) => {
            //console.log(response.data);
            setData(response.data);
            setLoading(false);
            //toast.success('Organizers loaded successfully');
        }
        ).catch((error) => {
            //console.log(error);
            toast.error(error.message);
        });

    }, []);

    const handleDelete = (id) => {
        organizerService.remove(id).then((response) => {
            //console.log(response.data);
            setData(data.filter((item) => item.id !== id));
            toast.success('Organizer deleted successfully');
        }
        ).catch((error) => {
            //console.log(error);
            toast.error(error.message);
        });
    };

    
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', m:2 }}>
            <h1>Organizers</h1>
            <Box sx={{ p:1, m:1, flexDirection: 'row' }}>
                <Button variant="contained" onClick={() => {navigate('/organizers/add')}} sx={{m:1}} endIcon={<AddIcon />}>Create</Button>
                <Button variant="outlined" onClick={() => {navigate('/')}} sx={{m:1}}>Go Back Home</Button>
            </Box>
            <TableTemplate columns={OrganizerColumns} data={data} path="/organizers" handleDelete={handleDelete} loading={loading}/>
        </Box>
    );
};

export default OrganizerIndex;
