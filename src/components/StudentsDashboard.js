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
  const navigate = useNavigate();

  const handleViewCourse = (course) => {
    navigate(`/student/courseDetails/${course.id}`, {
      state: { courseId: course.id },
    });
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
      <AppBar position="static" sx={{ backgroundColor: "#d32f2f" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: "#ffffff" }}>
            Enrolled Courses
          </Typography>
          <Button
            color="inherit"
            component={Link}
            to="/student/allCourses"
            sx={{ color: "#ffffff" }}
          >
            All Courses
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={8} height="10vh" direction="row" alignItems="center" p={10}>
        {courses.length === 0 ? (
          <Typography 
            variant="h6" 
            sx={{ 
              textAlign: "center", 
              marginTop: "10px", // reduced top margin
              gridColumn: "1 / -1",
              fontSize: "1.5rem", // larger font size
              fontWeight: "bold", // bold font weight
            }}
          >
            You have not enrolled in any courses yet. Please go to the
            <Button className="buttonStyle"            >
              All Courses Dashboard
            </Button>
            and enroll yourself into a course to see your courses.
          </Typography>
        ) : (
          courses.map((course) => (
            <Grid item xs={4} key={course.id}>
            <Box sx={{ minWidth: 275 }}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ color: "#d32f2f" }}>
                    {course.name}
                  </Typography>
                  <Avatar
                    alt="student"
                    src={require("../assets/images/studentCourse.jpg")}
                    sx={{ width: "auto", height: "auto" }}
                    variant="square"
                  />
                  <Typography variant="body2" sx={{ color: "#333333", minHeight:'6vw', maxHeight:'6vw'}}>
                    {course.description}
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: "flex-end" }}>
                  <Button
                    size="small"
                    color="primary"
                    variant="contained"
                    onClick={() => handleViewCourse(course)}
                    sx={{ backgroundColor: "#d32f2f", color: "#ffffff" }}
                  >
                    View Course
                  </Button>
                </CardActions>
              </Card>
            </Box>
            </Grid>
          ))
        )}
      </Grid>
    </>
  );
};

export default StudentsDashboard;
