import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Loading from "./Loading";
import { useLoading } from "../context/loadingContext";
import { useParams, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
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

const EnrolledStudents = () => {
  const buttonStyle = {
    backgroundColor: "#d32f2f",
    color: "#ffffff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.2s ease-in-out",
    marginTop: '30px',
    marginLeft: '45%',
  };

  const navigate = useNavigate();

  var user = JSON.parse(localStorage.getItem("user"));
  const [data, setData] = useState([]);
  const { courseId } = useParams();
  const { loading, setLoading } = useLoading();

  const handleGoBackToCourse = (courseId) => {
    navigate(`/instructor/courseDetails/${courseId}`, {
      state: { courseId: courseId },
    });

  };

  useEffect(() => {

    setLoading(true);
    // Fetch data from the API when the component mounts
    fetch(`https://pathshala-api-8e4271465a87.herokuapp.com/pathshala/user/getEnrolledStudents/${courseId}`, {
      headers: {
        "Content-Type": "application/json",
        "authorization-token": localStorage.getItem("token"),
        "userId": localStorage.getItem("userId"),
        "userType": localStorage.getItem("userType"),
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Assuming data is an array of objects with fields like 'firstName', 'lastName', 'email', 'phoneNumber', etc.
  const headers = [
    ["firstName", "First Name"],
    ["lastName", "Last Name"],
    ["emailId", "Email ID"],
    ["phoneNumber", "Phone Number"],
  ];

  return (
    <>
      {loading && <Loading />}
      <Typography variant="h3" sx={{ marginBottom: "20px", color: "#d32f2f", textAlign: "center" }}>
        Enrolled Students
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "800px", margin: "auto", marginTop: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"  }}
      >
        <Table stickyHeader>
          <TableHead sx={{ backgroundColor: "#ffffff" }}>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell key={index} sx={{ fontWeight: "bold" }}>
                  {header[1]}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                {headers.map((header, index) => {
                  return <TableCell key={index} sx={{ color: "#333333" }}>
                    {row[header[0]]}</TableCell>;
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <button style={buttonStyle} onClick={() => handleGoBackToCourse(courseId)}>
        Go Back To Course Details
      </button>

    </>
  );
};

export default EnrolledStudents;