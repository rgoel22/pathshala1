import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { useParams, useNavigate } from 'react-router-dom';

const CourseDetails = () => {
  const [course, setCourse] = useState({});
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.2s ease-in-out',
    marginLeft: '10px' // Add margin-left to create horizontal space
  };

  const textStyle = {
    fontSize: '16px',
    lineHeight: '1.5',
    marginBottom: '10px',
  };

  const textBoxStyle = {
    width: '60%',
    margin: '0 auto',
    height: '100px',
    padding: '10px',
    border: '1px solid #ccc',
    textAlign: 'center',
  };

  useEffect(() => {
    fetch(`https://pathshala-api-8e4271465a87.herokuapp.com/pathshala/courses/${courseId}`)
      .then(res => res.json())
      .then(data => {
        console.log('API response:', data);
        setCourse(data); // Update the 'course' state variable with the data
      })
      .catch(error => console.error('API error:', error));
  }, [courseId]);

  const handleEditCourse = () => {
    if (editMode) {
      // Send updated course information to backend using API call
      fetch(`https://pathshala-api-8e4271465a87.herokuapp.com/pathshala/courses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(course) // Send the entire 'course' object as the request body
      })
      .then(res => res.json())
      .then(data => {
        console.log('API response:', data);
        setCourse(data); // Update the 'course' state variable with the updated data
        setEditMode(false); // Reset edit mode
      })
      .catch(error => console.error('API error:', error));
    } else {
      setEditMode(true);
    }
  };

  const handleDescriptionChange = (event) => {
    const updatedCourse = { ...course, description: event.target.value };
    setCourse(updatedCourse);
  };

  const handleSyllabusChange = (event) => {
    const updatedCourse = { ...course, syllabus: event.target.value };
    setCourse(updatedCourse);
  };

  const handleGoBack = () => {
    navigate('/instructor'); // Navigate back to InstructorDashboard.js
  };

  if (!course) {
    return <div>Loading...</div>; // You may want to add a loading indicator
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ textAlign: 'center' }}>Selected Course: {course.name}</h1>
      <b>Course Description:</b>
      <div style={textStyle}>
        <br/>
        <textarea
          id="description"
          style={textBoxStyle}
          value={course.description}
          disabled={!editMode}
          onChange={handleDescriptionChange}
        />
      </div>
      <b>Syllabus:</b>
      <div style={textStyle}>
        <br/>
        <textarea
          id="syllabus"
          style={textBoxStyle}
          value={course.syllabus}
          disabled={!editMode}
          onChange={handleSyllabusChange}
        />
      </div>
      <button style={buttonStyle} onClick={handleEditCourse}>
        {!editMode ? 'Edit Course' : 'Save Changes'}
      </button>
      <button style={buttonStyle} onClick={handleGoBack}>
        Go Back To Dashboard
      </button>
    </div>
  );
};

export default CourseDetails;