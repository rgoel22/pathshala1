import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/user/user.context';
import { Avatar, Box, Card, CardActions, CardContent, Grid, IconButton, Dialog } from '@mui/material';

const AllCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('https://pathshala-api-8e4271465a87.herokuapp.com/pathshala/courses', {
      headers: {
        "Content-Type": "application/json",
        "authorization-token": localStorage.getItem("token"),
        "userId": localStorage.getItem("userId"),
        "userType": localStorage.getItem("userType"),
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCourses(data);
      });
  }, []);

  return (
    <>
        <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            All Courses
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <Link to="/student" style={{ color: 'white', textDecoration: 'none' }}>Enrolled Courses</Link>
            </Box>
        </Toolbar>
        </AppBar>

      <Grid container spacing={8} height="100vh" direction="row" alignItems="center" p={10}>
        {courses.map((course) => (
          <Grid item xs={4} key={course.id}>
            <Box sx={{ minWidth: 275 }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="div">
                    {course.name}
                  </Typography>
                  <Avatar
                    alt='allCourses'
                    src={require("../assets/images/allCourse.jpg")}
                    sx={{ width: "auto", height: "auto" }}
                    variant="square"
                  />
                  <Typography variant="body2" style={{minHeight:'6vw', maxHeight:'6vw'}}>{course.description}</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'end' }}>
                  <Button size="small" color="primary" variant="outlined" href={`/courses/${course.id}`}>Enroll</Button>
                </CardActions>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
      
    </>
  );
};

export default AllCourses;
