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
import CourseDetails from "./CourseDetails";

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const navigate = useNavigate(); // Add the useNavigate hook

  const handleViewCourse = (course) => {
    setModalData(course);
    setOpenModal(true);
    console.log("Selected courseId:", course.id);
    navigate(`/instructor/courseDetails/${course.id}`, {
      state: { courseId: course.id },
    });
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    fetch(
      "https://pathshala-api-8e4271465a87.herokuapp.com/pathshala/courses/instructor?userId=" +
        localStorage.getItem("userId"),
      {
        headers: {
          "Content-Type": "application/json",
          "authorization-token": localStorage.getItem("token"),
          userId: localStorage.getItem("userId"),
          userType: localStorage.getItem("userType"),
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
      <Grid
        container
        spacing={8}
        height="100vh"
        direction="row"
        alignItems="center"
        p={10}
      >
        {courses.map((course) => {
          return (
            <Grid item xs={4} key={course.id}>
              <Box sx={{ minWidth: 275 }}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {course.name}
                    </Typography>
                    <Avatar
                      alt="instructor"
                      src={require("../assets/images/instructor.jpeg")}
                      sx={{ width: "auto", height: "auto" }}
                      variant="square"
                    />
                    <Typography variant="body2">
                      {course.description}
                    </Typography>
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
          );
        })}
      </Grid>
      <Dialog open={openModal} onClose={handleModalClose}>
        <CourseDetails courseId={modalData.id} />
      </Dialog>
    </>
  );
};

export default InstructorDashboard;
