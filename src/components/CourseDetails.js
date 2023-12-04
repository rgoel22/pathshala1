import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';

const CourseDetails = () => {
  const [course, setCourse] = useState({});
  const {courseId} = useParams();

  const buttonStyle = {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.2s ease-in-out'
  };

  const textStyle = {
    fontSize: '16px',
    lineHeight: '1.5',
    marginBottom: '10px'
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

  if (!course) {
    return <div>Loading...</div>; // You may want to add a loading indicator
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={textStyle}>Selected Course: {course.name}</h1>
      <p style={textStyle}>Course Description: {course.description}</p>
      <p style={textStyle}>Syllabus: {course.syllabus}</p>
      <button style={buttonStyle}>Edit Course</button>
    </div>
  );
};

export default CourseDetails;
