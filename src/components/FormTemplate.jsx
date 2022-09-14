import { Container, Paper, Stack } from '@mui/material';
import { useState } from 'react';

const FormUtility = (initalValues) => {
    const [values, setValues] = useState(initalValues);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        //console.log(name, value);
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleReset = () => {
        setValues(initalValues);
    };

    return {
        values,
        handleReset,
        setValues,
        handleChange,
    };
};

const FormTemplate = (props) => {
    const { children, heading, ...other } = props;
    return (
        <form {...other}>
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', m:'auto', p:2 }}>
            <Paper sx={{m:'auto', p:2, width:'50%'}}>
                <Stack spacing={3}>
                    <h2>{heading}</h2>
                    {children}
                </Stack>
            </Paper>
            </Container>
            
        </form> 
    );
};

export {FormTemplate, FormUtility};