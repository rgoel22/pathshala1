import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Navbar from './Navbar';
import Typography from '@mui/material/Typography';

const InstrunctorTable = () => {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalAction, setModalAction] = useState('add');
  const [selectedRowKey, setSelectedRowKey] = useState(null);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch('https://pathshala-api-8e4271465a87.herokuapp.com/pathshala/user/getInstructor')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleEditClick = (row) => {
    setModalData(row);
    setModalAction('edit');
    setOpenModal(true);
    setSelectedRowKey(row.id);
  };

  const handleAddClick = () => {
    setModalData({});
    setModalAction('add');
    setOpenModal(true);
  };

  const handleDeleteClick = (id) => {
    console.log(`Delete button clicked for id ${id}`);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleSaveData = () => {
    // Handle saving data (add/edit) here
    // You may want to send a request to your API to save the changes
    let newModalData = { ...modalData };
    let url = 'https://pathshala-api-8e4271465a87.herokuapp.com/pathshala/user/';
    if (modalAction === 'add') {
      newModalData = {
        ...newModalData,
        rePassword: "Welcome@123",
        password: "Welcome@123",
        userId: modalData.emailId,
        userType: "INSTRUCTOR"
      }
      url = url + "signUp";
    } else {
      newModalData = {
        ...newModalData,
        "id": selectedRowKey
      }
      url = url + "updateUser";
    }

    // setData(prev => {
    //   return prev.map(d => {
    //     if (newModalData.id === d.id) return newModalData;
    //     else return d;
    //   })
    // });

    fetch(url, {
      method: "POST", headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newModalData)
    }).then((res) => res.json()).then(newRow => {
      setData(prev => {
        return prev.map(d => {
          if (newRow.id === d.id) return newModalData;
          else return d;
        })
      });
    }).catch((err) => console.log(err))
    handleModalClose();
  };



  // Assuming data is an array of objects with fields like 'firstName', 'lastName', 'email', 'phoneNumber', etc.
  const headers = [["firstName", 'First Name'], ["lastName", 'Last Name'], ["emailId", 'Email ID'], ["phoneNumber", 'Phone Number']];

  return (
    <>
      <Navbar />
      <Typography variant="h4" align="center" sx={{ margin: '20px' }}>
        Manage Instructors
      </Typography>
      <TableContainer component={Paper} sx={{ maxWidth: '800px', margin: 'auto', marginTop: '20px' }}>
        <div style={{ textAlign: 'right', margin: '10px' }}>
          <IconButton color="primary" aria-label="add" onClick={handleAddClick}>
            <AddIcon />
          </IconButton>
        </div>
        <Table stickyHeader>
          <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell key={index} sx={{ fontWeight: 'bold' }}>{header[1]}</TableCell>
              ))}
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                {headers.map((header, index) => { return <TableCell key={index}>{row[header[0]]}</TableCell> })}

                <TableCell>
                  <IconButton color="primary" aria-label="edit" onClick={() => handleEditClick(row)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" aria-label="delete" onClick={() => handleDeleteClick(row)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openModal} onClose={handleModalClose}>
        <DialogTitle>{modalAction === 'add' ? 'Add Data' : 'Edit Data'}</DialogTitle>
        <DialogContent>
          {/* Add your input fields here */}
          <TextField
            label="First Name"
            value={modalData.firstName || ''}
            onChange={(e) => setModalData({ ...modalData, firstName: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            value={modalData.lastName || ''}
            onChange={(e) => setModalData({ ...modalData, lastName: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email ID"
            value={modalData.emailId || ''}
            onChange={(e) => setModalData({ ...modalData, emailId: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone Number"
            value={modalData.phoneNumber || ''}
            onChange={(e) => setModalData({ ...modalData, phoneNumber: e.target.value })}
            fullWidth
            margin="normal"
          />
          {/* Add other fields as needed */}
        </DialogContent>
        <div style={{ padding: '10px', textAlign: 'right' }}>
          <Button variant="outlined" onClick={handleModalClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSaveData} style={{ marginLeft: '10px' }}>
            Save
          </Button>
        </div>
      </Dialog>
    </>
  );
};

export default InstrunctorTable;
