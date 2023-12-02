// AdminPage.js

import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useUser } from '../context/user/user.context';

const AdminPage = () => {
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    console.log('Logout clicked');
  };

  return (
    <div className="admin-page">
      <div className="user-info">
        {user && (
          <>
            <Typography variant="body1" color="text.primary" style={{ marginRight: '16px' }}>
              Welcome, {user.username}
            </Typography>
            <Button variant="outlined" color="primary" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </div>

      {/* Existing card components remain unchanged */}
      <CardContainer
        title="Manage Users"
        titleStyle={{ fontSize: '24px', fontWeight: 'bold', color: '#4CAF50' }}
        description="Manage users in the system"
        descriptionStyle={{ fontSize: '16px', color: '#555' }}
      >
        <ImgMediaCard />
      </CardContainer>

      <CardContainer
        title="Manage Instructors"
        titleStyle={{ fontSize: '24px', fontWeight: 'bold', color: '#2196F3' }}
        description="Manage instructors in the system"
        descriptionStyle={{ fontSize: '16px', color: '#555' }}
      >
        <ImgMediaCard />
      </CardContainer>

      <CardContainer
        title="Manage Courses"
        titleStyle={{ fontSize: '24px', fontWeight: 'bold', color: '#FF5722' }}
        description="Manage courses in the system"
        descriptionStyle={{ fontSize: '16px', color: '#555' }}
      >
        <ImgMediaCard />
      </CardContainer>
    </div>
  );
};

const CardContainer = ({ title, titleStyle, description, descriptionStyle, cardText, children }) => {
  return (
    <div className="card-container">
      <Typography gutterBottom variant="h4" component="div" style={titleStyle}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" style={descriptionStyle}>
        {description}
      </Typography>
      {children}
      <Typography variant="body2" color="text.secondary">
        {cardText}
      </Typography>
    </div>
  );
};

const ImgMediaCard = () => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        // Use the correct relative path from the public URL
        image={process.env.PUBLIC_URL + '/user-manage.jpg'}
      />
      <CardContent>
        {/* Text specific to each card */}
        {/* You can customize this text based on the specific content you want for each card */}
      </CardContent>
    </Card>
  );
};

export default AdminPage;
