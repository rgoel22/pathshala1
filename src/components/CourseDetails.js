// CourseDetails.js

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Document, Page } from 'react-pdf';
import { Viewer } from 'react-doc-viewer';

const CourseDetails = () => {
  const [course, setCourse] = useState({});
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [isCourseUpdated, setIsCourseUpdated] = useState(false);
  const [uploadedMaterial, setUploadedMaterial] = useState(null);

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

  async function handleEnrolledStudents(course) {
    const response = await fetch(
      `https://pathshala-api-8e4271465a87.herokuapp.com/pathshala/courses/${courseId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "authorization-token": localStorage.getItem("token"),
          "userId": localStorage.getItem("userId"),
          "userType": localStorage.getItem("userType"),
        },
      }
    );

    if (response.ok) {
      const fullCourseData = await response.json();
      navigate(`/instructor/courseDetails/enrolledStudents/${fullCourseData.id}`, {
        state: { courseId: fullCourseData.id },
      });
    } else {
      // Handle error scenario
      console.error("Failed to fetch course details:", response.status);
    }
  }

  const handleUploadMaterial = () => {
    navigate(`/instructor/courseDetails/${courseId}/uploadMaterial/${courseId}`);
  };

  if (!course) {
    return <div>Loading...</div>; // You may want to add a loading indicator
  }

  const publishButtonStyle = {
    ...buttonStyle,
    backgroundColor: isCourseUpdated ? "#007bff" : "#cccccc", // Disable the button if the course is not updated
    cursor: isCourseUpdated ? "pointer" : "default",
  };

  const handleFileUpload = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    const response = await fetch(
      `https://pathshala-api-8e4271465a87.herokuapp.com/pathshala/file/upload`,
      {
        method: "POST",
        headers: {
          "authorization-token": localStorage.getItem("token"),
          "userId": localStorage.getItem("userId"),
          "userType": localStorage.getItem("userType"),
        },
        body: formData
      }
    );
    
    const data = await response.json();
    console.log("Uploaded Study Material Data:", data);
    setUploadedMaterial(data.path);
  };

  const handleFileDownload = (uploadedMaterial) => {
    if (uploadedMaterial) {
      const downloadEndpoint = `https://pathshala-api-8e4271465a87.herokuapp.com/pathshala/file/download?path=${uploadedMaterial}`;

      fetch(downloadEndpoint, {
        method: 'GET',
        headers: {
          'authorization-token': localStorage.getItem('token'),
          userId: localStorage.getItem('userId'),
          userType: localStorage.getItem('userType'),
        },
      })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = uploadedMaterial; // set the download attribute with the desired file name
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch((error) => console.error('Error during file download:', error));
    } else {
      console.error('No study material uploaded');
    }
  }

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
    <Button
      variant="contained"
      component="label"
      onClick={handleUploadMaterial} // Navigate to upload study material page
    >
      Upload Study Material
      <input
        type="file"
        hidden
        onChange={(e) => handleFileUpload(e)}
      />
    </Button>
    {uploadedMaterial && (
      <div>
        <p>Uploaded Study Material:</p>
        {uploadedMaterial.endsWith('.pdf') ? (
          <Document file={uploadedMaterial}>
            <Page pageNumber={1} />
          </Document>
        ) : uploadedMaterial.endsWith('.doc') ? (
          <Viewer url={uploadedMaterial} />
        ) : (
          <iframe
            title="Uploaded Material"
            src={URL.createObjectURL(uploadedMaterial)}
            width="100%"
            height="600px"
          />
        )}
      </div>
    )}
    {/* <Button onClick={() => handleFileDownload(uploadedMaterial)}>
      Download Study Material
    </Button> */}
    <br />
    <br />
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
    <button style={buttonStyle} onClick={() => handleEnrolledStudents(course)}>
      Enrolled Students
    </button>
    <button style={buttonStyle} onClick={handleGoBack}>
      Go Back To Dashboard
    </button>
  </div>
);
};

export default CourseDetails;

