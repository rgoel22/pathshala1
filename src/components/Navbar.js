import React, { useContext, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/user/user.context';
import { Avatar, IconButton } from '@mui/material';
import { UserContext } from "./../context/user/user.context"
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

const Navbar = () => {
  const { logout } = useUser();
  const [greyScale, setGreyScale] = useState(false);
  const navigate = useNavigate(); // Use the useNavigate hook for navigation
  const { changeUser, user } = useContext(UserContext);
  const handleLogout = () => {
    var id = JSON.parse(localStorage.getItem('user')).userDetails.id
    fetch('https://pathshala-api-8e4271465a87.herokuapp.com/pathshala/user/logout?userId=' + id, {
      headers: {
        "Content-Type": "application/json",
        "authorization-token": localStorage.getItem("token"),
        "userId": localStorage.getItem("userId"),
        "userType": localStorage.getItem("userType"),
      }
    })
      .then(changeUser(null))
    navigate('/'); // Use the navigate function to redirect to the SignIn page
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGreyScaleChange = (event) => {
    const body = document.body;
    body.classList.toggle('grayscale');
    setGreyScale(!greyScale)
  };


  return (
    <AppBar position="static" color='transparent'>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <IconButton sx={{ p: 0 }}>
            <Avatar alt='Pathshala' src={require("../assets/images/pathshala.jpg")} sx={{ width: 156, height: 56 }} variant="square" />
          </IconButton>
        </Typography>

        <FormControlLabel
          control={
            <Switch checked={greyScale} onChange={handleGreyScaleChange} name="jason" />
          }
          label="Grey Scale"
        />
        {localStorage.getItem('userType') === 'ADMIN' &&
          <Button component={Link} to="/admin" color="inherit">
            Admin Home
          </Button>}
        <Button color="inherit" onClick={handleClick}
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}>
          {user ? user?.userDetails?.firstName : JSON.parse(localStorage.getItem('user')).userDetails.firstName}
        </Button>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleLogout}>Log out</MenuItem>
        </Menu>

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
