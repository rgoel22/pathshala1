import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography, Paper, Box } from "@mui/material";

const StudentCourseView = () => {
  const [course, setCourse] = useState({});
  const { courseId } = useParams();
  const navigate = useNavigate();

  const buttonStyle = {
    backgroundColor: "#d32f2f", // Darker Red
    color: "#ffffff", // White
    padding: "12px 24px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.2s ease-in-out",
    marginLeft: "10px",
  };

  const paperStyle = {
    padding: "20px",
    margin: "20px auto",
    maxWidth: "800px",
    textAlign: "left",
    backgroundColor: "#ffffff", // White
    color: "#333333", // Dark Gray
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Soft Black shadow
  };

  useEffect(() => {
    fetch(
      `https://pathshala-api-8e4271465a87.herokuapp.com/pathshala/courses/${courseId}`,
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
        console.log("API response:", data);
        setCourse(data);
      })
      .catch((error) => console.error("API error:", error));
  }, [courseId]);


  const handleGoBack = () => {
    navigate("/student/allCourses");
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <Typography variant="h3" sx={{ marginBottom: "20px", color: "#d32f2f" }}>
        {course.name} ({course.courseCode})
      </Typography>

      <Paper style={paperStyle}>
        <Typography variant="h5" sx={{ marginBottom: "10px", color: "#d32f2f" }}>
          <b>Course Description:</b>
        </Typography>
        <Typography variant="body1">{course.description}</Typography>
      </Paper>

      <Paper style={{ ...paperStyle, margin: "20px auto" }}>
        <Typography variant="h5" sx={{ marginBottom: "10px", color: "#d32f2f" }}>
          <b>Syllabus:</b>
        </Typography>
        <Typography variant="body1">{course.syllabus}</Typography>
      </Paper>


      <Button
        style={buttonStyle}
        onClick={handleGoBack}
      >
        Go Back To Course Listing
      </Button>
    </Box>
  );
};

export default StudentCourseView;
