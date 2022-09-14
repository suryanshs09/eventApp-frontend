import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import guestService from '../../services/GuestService';
import { toast } from 'react-toastify';
import { Box } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import TableTemplate from '../../components/TableTemplate';
import { GuestColumns } from '../../components/ColumnHeaders';

const GuestIndex = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        guestService.getAll().then((response) => {
            //console.log(response.data);
            setData(response.data);
            setLoading(false);
            //toast.success('Guests loaded successfully');
        }
        ).catch((error) => {
            //console.log(error);
            toast.error(error.message);
        });

    }, []);

    const handleDelete = (id) => {
        guestService.remove(id).then((response) => {
            //console.log(response.data);
            setData(data.filter((item) => item.id !== id));
            toast.success('Guest deleted successfully');
        }
        ).catch((error) => {
            //console.log(error);
            toast.error(error.message);
        });
    };

    
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', m:2 }}>
            <h1>Guests</h1>
            <Box sx={{ p:1, m:1, flexDirection: 'row' }}>
                <Button variant="contained" onClick={() => {navigate('/guests/add')}} sx={{m:1}} endIcon={<AddIcon />}>Create</Button>
                <Button variant="outlined" onClick={() => {navigate('/')}} sx={{m:1}}>Go Back Home</Button>
            </Box>
            <TableTemplate columns={GuestColumns} data={data} path="/guests" handleDelete={handleDelete} loading={loading}/>
        </Box>
    );
};

export default GuestIndex;
