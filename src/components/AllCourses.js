import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Avatar, Box, Card, CardActions, CardContent, Grid, Dialog } from '@mui/material';

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [openModal, setOpenModal] = useState(false);

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

  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#8B0000" }}>
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
                  <Typography variant="h5" component="div" sx={{ color: "#8B0000" }}>
                    {course.name}
                  </Typography>
                  <Avatar
                    alt='allCourses'
                    src={require("../assets/images/allCourse.jpg")}
                    sx={{ width: "auto", height: "auto" }}
                    variant="square"
                  />
                  <Typography variant="body2" sx={{ color: "#333333" }}>
                    {course.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    href={`/courses/${course.id}`}
                    sx={{ backgroundColor: "#8B0000", color: "#ffffff" }}
                  >
                    Enroll
                  </Button>
                </CardActions>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Dialog open={openModal} onClose={handleModalClose}>
        Hello
      </Dialog>
    </>
  );
};

export default AllCourses;
