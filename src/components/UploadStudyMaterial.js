import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Document, Page } from 'react-pdf';
// import { Viewer } from 'react-doc-viewer';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import PdfViewer from "./PdfViewer";

const pdfUrl = 'https://pathshala-api-8e4271465a87.herokuapp.com/pathshala/file/download?path=src/main/resources/uploadedFiles/1701925636345_ENPM687-CY01_LinuxForensics_FileCarving_UditrajSinghRathore.pdf';

const UploadStudyMaterial = () => {
  const [course, setCourse] = useState({});
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [editMode] = useState(false);
  const [isCourseUpdated, setIsCourseUpdated] = useState(false);
  const [uploadedMaterial, setUploadedMaterial] = useState(null);
  const [preview, setPreview] = useState('');

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

    // Create a preview URL
    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setPreview(objectUrl);
  };

  const renderUploadedMaterial = () => {
    if (uploadedMaterial) {
      return (
        <div>
          <p>Uploaded Study Material:</p>
          {uploadedMaterial.endsWith('.pdf') ? (
            <div style={{ overflowY: 'auto', maxHeight: '600px' }}>
              <Document file={uploadedMaterial}>
                <Page pageNumber={1} />
              </Document>
            </div>
          ) : uploadedMaterial.endsWith('.docx') ? (
            <div style={{ overflowY: 'auto', maxHeight: '600px' }}>
              <Viewer url={uploadedMaterial} />
            </div>
          ) : (
            <img src={preview} alt="Preview" style={{ width: '100%', maxHeight: '600px', overflowY: 'auto' }} />
          )}
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ textAlign: "center"}}> Upload Study Material </h1>
      <h2 style={{ textAlign: "center" }}>Selected Course New: {course.name}</h2>
      <div style={textStyle}>
        <b>Course Description:</b>
        <br />
        <textarea
          id="description"
          style={textBoxStyle}
          value={course.description}
          disabled={!editMode}
          onChange={(e) => {
            setCourse({ ...course, description: e.target.value });
            setIsCourseUpdated(true);
          }}
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
          onChange={(e) => {
            setCourse({ ...course, syllabus: e.target.value });
            setIsCourseUpdated(true);
          }}
        />
      </div>
      <Button
        variant="contained"
        component="label"
      >
        Upload Study Material
        <input
          type="file"
          hidden
          onChange={(e) => handleFileUpload(e)}
        />
      </Button>
      {renderUploadedMaterial()}
      <Button onClick={() => {/* Handle file download here */}}>
        Download Study Material
      </Button>
      <div>
            <h1>PDF Viewer</h1>
            <PdfViewer pdfUrl={pdfUrl} />
      </div>
      <br />
      <br />
      <button style={buttonStyle} onClick={() => navigate(`/instructor/courseDetails/${courseId}`)}>
        Go Back To Dashboard
      </button>
    </div>
  );
};

export default UploadStudyMaterial;
