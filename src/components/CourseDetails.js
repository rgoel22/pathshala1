import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Typography, TextField } from "@mui/material";

const CourseDetails = () => {
  const [course, setCourse] = useState({});
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [isCourseUpdated, setIsCourseUpdated] = useState(false);

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.2s ease-in-out",
    marginLeft: "10px",
  };

  const textStyle = {
    fontSize: "16px",
    lineHeight: "1.5",
    marginBottom: "10px",
    width: "60%",
    margin: "0 auto",
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

  const handleEditCourse = () => {
    setEditMode(!editMode);
    setIsCourseUpdated(false);
  };

  const handleSaveChanges = () => {
    if (editMode && isCourseUpdated) {
      fetch(
        `https://pathshala-api-8e4271465a87.herokuapp.com/pathshala/courses`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "authorization-token": localStorage.getItem("token"),
            "userId": localStorage.getItem("userId"),
            "userType": localStorage.getItem("userType"),
          },
          body: JSON.stringify(course),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("API response:", data);
          setCourse(data);
          setEditMode(false);
          setIsCourseUpdated(false);
        })
        .catch((error) => console.error("API error:", error));
    }
  };

  const handleDescriptionChange = (event) => {
    const updatedCourse = { ...course, description: event.target.value };
    setCourse(updatedCourse);
    setIsCourseUpdated(true);
  };

  const handleSyllabusChange = (event) => {
    const updatedCourse = { ...course, syllabus: event.target.value };
    setCourse(updatedCourse);
    setIsCourseUpdated(true);
  };

  const handleGoBack = () => {
    navigate("/instructor");
  };

  const handleFileUpload = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    const response = await fetch(
      `https://pathshala-api-8e4271465a87.herokuapp.com/pathshala/file/upload`,
      {
        method: "POST",
        headers: {
          "authorization-token": localStorage.getItem("token"),
          "userId": localStorage.getItem("userId"),
          "userType": localStorage.getItem("userType"),
        },
        body: formData,
      }
    );

    // Handle response as needed
  };

  const handleFileDownload = () => {
    fetch(
      `https://pathshala-api-8e4271465a87.herokuapp.com/pathshala/file/download?path=src/main/resources/uploadedFiles/1701934321914_certificate.pdf`,
      {
        method: "GET",
        headers: {
          "authorization-token": localStorage.getItem("token"),
          "userId": localStorage.getItem("userId"),
          "userType": localStorage.getItem("userType"),
        },
      }
    )
      .then((res) => res.blob())
      .then((data) => {
        const file = window.URL.createObjectURL(data);
        window.open(file);
      })
      .catch((error) => console.error("API error:", error));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Typography variant="h4" sx={{ marginBottom: "20px" }}>
        Selected Course: {course.name} ({course.courseCode})
      </Typography>

      <div style={textStyle}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          Course Description:
        </Typography>
        <TextField
          id="description"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={course.description}
          disabled={!editMode}
          onChange={handleDescriptionChange}
        />
      </div>

      <div style={textStyle}>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          Syllabus:
        </Typography>
        <TextField
          id="syllabus"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={course.syllabus}
          disabled={!editMode}
          onChange={handleSyllabusChange}
        />
      </div>

      <Button variant="contained" component="label">
        Upload Study Material
        <input
          type="file"
          hidden
          onChange={(e) => handleFileUpload(e)}
        />
      </Button>

      <Button onClick={handleFileDownload} sx={{ marginY: "10px" }}>
        Download Study Material
      </Button>

      <Button style={buttonStyle} onClick={handleEditCourse}>
        {!editMode ? "Edit Course" : "Cancel Edit"}
      </Button>

      <Button
        style={{
          ...buttonStyle,
          backgroundColor: isCourseUpdated ? "#007bff" : "#cccccc",
          cursor: isCourseUpdated ? "pointer" : "default",
        }}
        onClick={handleSaveChanges}
        disabled={!isCourseUpdated}
      >
        Publish Course
      </Button>

      <Button style={buttonStyle} onClick={handleEnrolledStudents}>
        Enrolled Students
      </Button>

      <Button style={buttonStyle} onClick={handleGoBack}>
        Go Back To Dashboard
      </Button>
    </div>
  );
};

export default CourseDetails;
