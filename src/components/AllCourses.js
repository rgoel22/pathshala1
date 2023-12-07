import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import useAlert from '../hooks/useAlert';
import { Avatar, Box, Card, CardActions, CardContent, Grid, Dialog } from '@mui/material';

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const { setAlert } = useAlert();
  const navigate = useNavigate();
  const handleEnrollCourse = (course) => {
    fetch(`https://pathshala-api-8e4271465a87.herokuapp.com/pathshala/courses/enroll?userId=`+localStorage.getItem("userId") + `&courseId=${course.id}`,{
     headers: {
       "Content-Type": "application/json",
       "authorization-token": localStorage.getItem("token"),
       "userId": localStorage.getItem("userId"),
       "userType": localStorage.getItem("userType"),
     }
   }).then((res) => {
    setAlert('Successfully enrolled', 'success');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
   }).catch(e => {
    setAlert('Something went wrong', 'error')
   });
   };

   const handleViewCourse = (course) => {
    navigate(`/student/viewCourse/${course.id}`, {
      state: { courseId: course.id },
    });
  };

   useEffect(() => {
    fetch('https://pathshala-api-8e4271465a87.herokuapp.com/pathshala/courses/getUnEnrolledCourses?userId='+localStorage.getItem("userId"), {
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
      <AppBar position="static" sx={{ backgroundColor: "#d32f2f" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#ffffff" }}>
            All Courses
            </Typography>
          <Link to="/student" style={{ color: '#ffffff', textDecoration: 'none' }}>
            <Button color="inherit">Enrolled Courses</Button>
          </Link>
        </Toolbar>
        </AppBar>

      <Grid container spacing={8} height="100vh" direction="row" alignItems="center" p={10}>
        {courses.map((course) => (
          <Grid item xs={4} key={course.id}>
            <Box sx={{ minWidth: 275 }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ color: "#d32f2f" }}>
                    {course.name}
                  </Typography>
                  <Avatar
                    alt='allCourses'
                    src={require("../assets/images/allCourse.jpg")}
                    sx={{ width: "auto", height: "auto" }}
                    variant="square"
                  />
                  <Typography variant="body2" sx={{ color: "#333333" ,minHeight:'6vw', maxHeight:'6vw'}}>
                    {course.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    sx={{ backgroundColor: "#d32f2f", color: "#ffffff" }}
                    onClick={()=> handleViewCourse(course)}
                  >
                    View Course
                  </Button>
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    sx={{ backgroundColor: "#d32f2f", color: "#ffffff" }}
                    onClick={()=> handleEnrollCourse(course)}
                  >
                    Enroll
                  </Button>
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
