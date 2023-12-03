import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/user/user.context';
import { Avatar, IconButton } from '@mui/material';

const Navbar = () => {
  const { logout } = useUser();
  const navigate = useNavigate(); // Use the useNavigate hook for navigation

  const handleLogout = () => {
    navigate('/'); // Use the navigate function to redirect to the SignIn page
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <IconButton sx={{ p: 0 }}>
            <Avatar alt='Pathshalo' src={require("../assets/images/pathshala.jpg")} />
          </IconButton>
          My Dashboard
        </Typography>
        <Button component={Link} to="/admin" color="inherit">
          Admin Home
        </Button>
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
