import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  AddIcon,
  EditIcon,
  DeleteIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
} from "./YourMuiComponents"; // Import your Mui components

import Loading from "./Loading";
import ConfirmDelete from "./ConfirmDelete";
import { useLoading } from "../context/loadingContext";
import useAlert from "../hooks/useAlert";

const InstrunctorTable = () => {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalAction, setModalAction] = useState("add");
  const [selectedRowKey, setSelectedRowKey] = useState(null);
  const { loading, setLoading } = useLoading();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { setAlert } = useAlert();

  useEffect(() => {
    setLoading(true);
    fetch(
      "https://pathshala-api-8e4271465a87.herokuapp.com/pathshala/user/getInstructor",
      {
        headers: {
          "Content-Type": "application/json",
          "authorization-token": localStorage.getItem("token"),
          "userId": localStorage.getItem("userId"),
          "userType": localStorage.getItem("userType"),
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [setLoading]);

  const handleEditClick = (row) => {
    setModalData(row);
    setModalAction("edit");
    setOpenModal(true);
    setSelectedRowKey(row.id);
  };

  const handleAddClick = () => {
    setModalData({});
    setModalAction("add");
    setOpenModal(true);
  };

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
        .then(() => {
          setData((prevData) =>
            prevData.filter((item) => item.id !== modalData.id)
          );
          setAlert(
            `${modalData.firstName} ${modalData.lastName} deleted`,
            "success"
          );
          setShowDeleteConfirm(false);
        })
        .catch(() => {
          setAlert(
            `Error in deleting ${modalData.firstName} ${modalData.lastName}`,
            "error"
          );
          setShowDeleteConfirm(false);
        });
    } catch (err) {
      setAlert(
        `Error in deleting ${modalData.firstName} ${modalData.lastName}`,
        "error"
      );
      setShowDeleteConfirm(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleSaveData = () => {
    let newModalData = { ...modalData };
    let url =
      "https://pathshala-api-8e4271465a87.herokuapp.com/pathshala/user/";
    if (modalAction === "add") {
      newModalData = {
        ...newModalData,
        userId: modalData.emailId,
        userType: "INSTRUCTOR",
      };
      url = url + "signUp";
    } else {
      newModalData = {
        ...newModalData,
        id: selectedRowKey,
      };
      url = url + "updateUser";
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization-token": localStorage.getItem("token"),
        "userId": localStorage.getItem("userId"),
        "userType": localStorage.getItem("userType"),
      },
      body: JSON.stringify(newModalData),
    })
      .then((res) => res.json())
      .then((newRow) => {
        setData((prev) =>
          prev.map((d) => (newRow.id === d.id ? newModalData : d))
        );
      })
      .catch((err) => console.log(err));
    handleModalClose();
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
      {showDeleteConfirm && (
        <ConfirmDelete
          handleDeleteCancel={handleDeleteCancel}
          handleDeleteConfirm={handleDeleteConfirm}
        />
      )}
      <Typography variant="h4" align="center" sx={{ margin: "20px", color: "#d32f2f" }}>
        Manage Instructors
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "800px", margin: "auto", marginTop: "20px" }}
      >
        <div style={{ textAlign: "right", margin: "10px" }}>
          <IconButton color="primary" aria-label="add" onClick={handleAddClick}>
            <AddIcon />
          </IconButton>
        </div>
        <Table stickyHeader>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell key={index} sx={{ fontWeight: "bold" }}>
                  {header[1]}
                </TableCell>
              ))}
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                {headers.map((header, index) => (
                  <TableCell key={index}>{row[header[0]]}</TableCell>
                ))}
                <TableCell>
                  <IconButton
                    color="primary"
                    aria-label="edit"
                    onClick={() => handleEditClick(row)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    aria-label="delete"
                    onClick={() => handleDeleteClick(row)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openModal} onClose={handleModalClose}>
        <DialogTitle>
          {modalAction === "add" ? "Add Instructor" : "Edit Instructor"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            value={modalData.firstName || ""}
            onChange={(e) =>
              setModalData({ ...modalData, firstName: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            value={modalData.lastName || ""}
            onChange={(e) =>
              setModalData({ ...modalData, lastName: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email ID"
            value={modalData.emailId || ""}
            onChange={(e) =>
              setModalData({ ...modalData, emailId: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number"
            value={modalData.phoneNumber || ""}
            onChange={(e) =>
              setModalData({ ...modalData, phoneNumber: e.target.value })
            }
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <div style={{ padding: "10px", textAlign: "right" }}>
          <Button variant="outlined" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveData}
            style={{ marginLeft: "10px" }}
          >
            Save
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default InstrunctorTable;
