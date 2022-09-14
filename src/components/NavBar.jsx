import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { /*Link,*/ NavLink, useNavigate } from "react-router-dom";

function NavBar(){
    const navigate = useNavigate();
    return (
        <AppBar position="static">
            <Toolbar variant="dense"
                sx={{
                    display: { xs: "flex" },
                    flexDirection: "row",
                    justifyContent: "space-between"
                }}
            >
                <Typography variant="h6" color="inherit" component="div" onClick={() => {navigate('/')}}>
                    Event App
                </Typography>
                <Box sx={{p: 1, m: 1}}>
                    <Button>
                        <NavLink to="/events" style={({isActive}) => { return {color: isActive? 'aqua': 'white', textDecoration:'none' }}}>Events</NavLink>
                    </Button>
                    <Button>
                        <NavLink to="/organizers" style={({isActive}) => { return {color: isActive? 'aqua': 'white', textDecoration:'none' }}}>Organizers</NavLink>
                    </Button>
                    <Button>
                        <NavLink to="/guests" style={({isActive}) => { return {color: isActive? 'aqua': 'white', textDecoration:'none' }}}>Guests</NavLink>
                    </Button>
                </Box>
                <Box sx={{p: 1, m: 1}}>
                    <Button sx={{ color: '#fff'}}>
                        <NavLink to="/profile" style={({isActive}) => { return {color: isActive? 'aqua': 'white', textDecoration:'none' }}}>Profile</NavLink>
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;