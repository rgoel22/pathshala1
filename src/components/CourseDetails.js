import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { useParams, useNavigate } from "react-router-dom";

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
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.2s ease-in-out",
    marginLeft: "10px", // Add margin-left to create horizontal space
  };

  const textStyle = {
    fontSize: "16px",
    lineHeight: "1.5",
    marginBottom: "10px",
  };

  const textBoxStyle = {
    width: "60%",
    margin: "0 auto",
    height: "100px",
    padding: "10px",
    border: "1px solid #ccc",
    textAlign: "center",
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
        setCourse(data); // Update the 'course' state variable with the data
      })
      .catch((error) => console.error("API error:", error));
  }, [courseId]);

  const handleEditCourse = () => {
    setEditMode(!editMode); // Toggle edit mode
    setIsCourseUpdated(false); // Reset the 'isCourseUpdated' flag
  };

  const handleSaveChanges = () => {
    if (editMode && isCourseUpdated) {
      // Send updated course information to backend using API call
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
          body: JSON.stringify(course), // Send the entire 'course' object as the request body
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("API response:", data);
          setCourse(data); // Update the 'course' state variable with the updated data
          setEditMode(false); // Reset edit mode
          setIsCourseUpdated(false); // Reset the 'isCourseUpdated' flag
        })
        .catch((error) => console.error("API error:", error));
    }
  };

  const handleDescriptionChange = (event) => {
    const updatedCourse = { ...course, description: event.target.value };
    setCourse(updatedCourse);
    setIsCourseUpdated(true); // Set the 'isCourseUpdated' flag to true
  };

  const handleSyllabusChange = (event) => {
    const updatedCourse = { ...course, syllabus: event.target.value };
    setCourse(updatedCourse);
    setIsCourseUpdated(true); // Set the 'isCourseUpdated' flag to true
  };

  const handleGoBack = () => {
    navigate("/instructor"); // Navigate back to InstructorDashboard.js
  };

  const handleEnrolledStudents = (course) =>{
    navigate(`/instructor/courseDetails/enrolledStudents/${course.id}`, {
      state: { courseId: course.id },
    });
  }
  if (!course) {
    return <div>Loading...</div>; // You may want to add a loading indicator
  }

  const publishButtonStyle = {
    ...buttonStyle,
    backgroundColor: isCourseUpdated ? "#007bff" : "#cccccc", // Disable the button if the course is not updated
    cursor: isCourseUpdated ? "pointer" : "default", // Change cursor style based on button state
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ textAlign: "center" }}>Selected Course: {course.name}</h1>
      <div style={textStyle}>
        <b>Course Description:</b>
        <br />
        <textarea
          id="description"
          style={textBoxStyle}
          value={course.description}
          disabled={!editMode}
          onChange={handleDescriptionChange}
        />
      </div>
      <div style={textStyle}>
        <b>Syllabus:</b>
        <br />
        <textarea
          id="syllabus"
          style={textBoxStyle}
          value={course.syllabus}
          disabled={!editMode}
          onChange={handleSyllabusChange}
        />
      </div>
      <button style={buttonStyle} onClick={handleEditCourse}>
        {!editMode ? "Edit Course" : "Cancel Edit"}
      </button>
      <button
        style={publishButtonStyle}
        onClick={handleSaveChanges}
        disabled={!isCourseUpdated}
      >
        Publish Course
      </button>
      <button style={buttonStyle} onClick={handleEnrolledStudents}>
        Enrolled Students
      </button>
      <button style={buttonStyle} onClick={handleGoBack}>
        Go Back To Dashboard
      </button>
    </div>
  );
};

export default CourseDetails;
