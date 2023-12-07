import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Loading from "./Loading";
import { useLoading } from "../context/loadingContext";
import ConfirmDelete from "./ConfirmDelete";
import useAlert from "../hooks/useAlert";

const MyTable = () => {
  const [modalData, setModalData] = useState({});
  const [data, setData] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { loading, setLoading } = useLoading();
  const { setAlert } = useAlert();

  useEffect(() => {
    setLoading(true);
    // Fetch data from the API when the component mounts
    fetch("https://pathshala-api-8e4271465a87.herokuapp.com/pathshala/user/getStudent", {
      headers: {
        "Content-Type": "application/json",
        "authorization-token": localStorage.getItem("token"),
        "userId": localStorage.getItem("userId"),
        "userType": localStorage.getItem("userType"),
      },
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

  const handleDeleteClick = (id) => {
    setModalData(id);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    let url = `https://pathshala-api-8e4271465a87.herokuapp.com/pathshala/user/deleteUser/${modalData.id}`;
    try {
      fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "authorization-token": localStorage.getItem("token"),
          "userId": localStorage.getItem("userId"),
          "userType": localStorage.getItem("userType"),
        },
      })
        .then((newRow) => {
          data.splice(data.indexOf(modalData), 1);
          setAlert(`${modalData.firstName} ${modalData.lastName} deleted`, "success");
          setShowDeleteConfirm(false);
        })
        .catch((err) => {
          setAlert(`Error in deleting ${modalData.firstName} ${modalData.lastName}`, "error");
          setShowDeleteConfirm(false);
        });
    } catch (err) {
      setAlert(`Error in deleting ${modalData.firstName} ${modalData.lastName}`, "error");
      setShowDeleteConfirm(false);
    }
  };
  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  const headers = [
    ["firstName", "First Name"],
    ["lastName", "Last Name"],
    ["emailId", "Email ID"],
    ["phoneNumber", "Phone Number"],
  ];

  return (
    <>
      {loading && <Loading />}
      {showDeleteConfirm && <ConfirmDelete handleDeleteCancel={handleDeleteCancel} handleDeleteConfirm={handleDeleteConfirm} />}
      <Typography variant="h3" sx={{ marginBottom: "20px", color: "#d32f2f", textAlign: "center" }}>
        Manage Students
      </Typography>
      <TableContainer component={Paper} sx={{ maxWidth: "800px", margin: "auto", marginTop: "20px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <Table stickyHeader>
          <TableHead sx={{ backgroundColor: "#ffffff" }}>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell key={index} sx={{ fontWeight: "bold"}}>
                  {header[1]}
                </TableCell>
              ))}
              <TableCell sx={{ fontWeight: "bold"}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                {headers.map((header, index) => (
                  <TableCell key={index} sx={{ color: "#333333" }}>
                    {row[header[0]]}
                  </TableCell>
                ))}
                <TableCell>
                  <IconButton color="secondary" aria-label="delete" onClick={() => handleDeleteClick(row)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default MyTable;
