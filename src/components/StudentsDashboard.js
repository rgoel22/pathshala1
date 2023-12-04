import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/user/user.context";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Dialog,
  Grid,
  IconButton,
} from "@mui/material";

const StudentsDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const navigate = useNavigate();

  const handleViewCourse = (course) => {
    setModalData(course);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    var id = JSON.parse(localStorage.getItem("user")).userDetails.id;
    fetch(
      "https://pathshala-api-8e4271465a87.herokuapp.com/pathshala/courses/student?userId=" +
        id,
      {
        headers: {
          "Content-Type": "application/json",
          "authorization-token": localStorage.getItem("token"),
          "userId": localStorage.getItem("userId"),
          "userType": localStorage.getItem("userType"),
        },
      }
    )
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
            Enrolled Courses
          </Typography>
          <Button
            color="inherit"
            onClick={() => navigate("/student/allCourses")}
          >
            All Courses
          </Button>
        </Toolbar>
      </AppBar>

      <Grid
        container
        spacing={8}
        height="100vh"
        direction="row"
        alignItems="center"
        p={10}
      >
        {courses.map((course) => (
          <Grid item xs={4} key={course.id}>
            <Box sx={{ minWidth: 275 }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="div">
                    {course.name}
                  </Typography>
                  <Avatar
                    alt="student"
                    src={require("../assets/images/studentCourse.jpg")}
                    sx={{ width: "auto", height: "auto" }}
                    variant="square"
                  />
                  <Typography variant="body2">{course.description}</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "end" }}>
                  <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    onClick={() => handleViewCourse(course)}
                  >
                    View Course
                  </Button>
                </CardActions>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Dialog open={openModal} onClose={handleModalClose}>
        Helo
      </Dialog>
    </>
  );
};

export default StudentsDashboard;
