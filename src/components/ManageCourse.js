import React, { useCallback, useEffect, useState } from 'react';
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
import Typography from '@mui/material/Typography';
import Loading from './Loading';
import ConfirmDelete from './ConfirmDelete';
import { useLoading } from '../context/loadingContext';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import useAlert from "../hooks/useAlert";



const CourseTable = () => {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [modalAction, setModalAction] = useState('add');
  const [selectedRowKey, setSelectedRowKey] = useState(null);
  const { loading, setLoading } = useLoading();
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const autocompleteLoading = open && options.length === 0;
  const [autocompleteData, setAutocompleteData] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { setAlert } = useAlert();

  useEffect(() => {
    let active = true;

    if (!autocompleteLoading) {
      return undefined;
    }

    (async () => {

      if (active) {
        setOptions(autocompleteData);
        // console.log(autocompleteData)
      }
    })();

    return () => {
      active = false;
    };
  }, [autocompleteLoading]);

  useEffect(() => {
    setLoading(true);
    // Fetch data from the API when the component mounts
    fetch('https://pathshala-api-8e4271465a87.herokuapp.com/pathshala/courses', {
      headers: {
        "Content-Type": "application/json",
        "authorization-token": localStorage.getItem("token"),
        "userId": localStorage.getItem("userId"),
        "userType": localStorage.getItem("userType"),
      }
    })
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error)
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch('https://pathshala-api-8e4271465a87.herokuapp.com/pathshala/user/getInstructor', {
      headers: {
        "Content-Type": "application/json",
        "authorization-token": localStorage.getItem("token"),
        "userId": localStorage.getItem("userId"),
        "userType": localStorage.getItem("userType"),
      }
    })
      .then(response => response.json()).then(result => {
        console.log(result);
        setAutocompleteData(result);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  const handleEditClick = useCallback((row) => {
    // console.log(row, 'row')
    setModalData(row);
    setModalAction('edit');
    setOpenModal(true);
    setSelectedRowKey(row.id);
  }, []);

  const handleAddClick = () => {
    setModalData({});
    setModalAction('add');
    setOpenModal(true);
  };

  const handleDeleteClick = (row) => {
    setModalData(row);
    setShowDeleteConfirm(true)
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const handleSaveData = () => {
    // Handle saving data (add/edit) here
    let newModalData = {
      ...modalData,
      "id": selectedRowKey
    };
    let url = 'https://pathshala-api-8e4271465a87.herokuapp.com/pathshala/courses';
    fetch(url, {
      method: "POST", headers: {
        "Content-Type": "application/json",

        "authorization-token": localStorage.getItem("token"),
        "userId": localStorage.getItem("userId"),
        "userType": localStorage.getItem("userType"),


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

  const handleDeleteConfirm = () => {
    let url = `https://pathshala-api-8e4271465a87.herokuapp.com/pathshala/courses/deleteCourse/${modalData.id}`;
    try {
      fetch(url, {
        method: "DELETE", headers: {
          "Content-Type": "application/json",
          "authorization-token": localStorage.getItem("token"),
          "userId": localStorage.getItem("userId"),
          "userType": localStorage.getItem("userType")
        },
      }).then(newRow => {
        data.splice(data.indexOf(modalData), 1)
        setAlert(`${modalData.name}deleted`, 'success')
        setShowDeleteConfirm(false)
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }).catch((err) => {
        setAlert(`Error in deleting ${modalData.name}`, 'error')
        setShowDeleteConfirm(false)
      })
    } catch (err) {
      setAlert(`Error in deleting ${modalData.name}`, 'error')
      setShowDeleteConfirm(false)
    }
  }
  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false)
  }


  // Assuming data is an array of objects with fields like 'name', 'courseCode' etc.
  let userId;
  const headers = [["name", 'Name'], ["courseCode", 'Course Code'], ["description", 'Description'], ["syllabus", 'Syllabus'],
  ['instructorName', 'Instructor Name']];

  return (
    <>
      {loading && <Loading />}
      {showDeleteConfirm && <ConfirmDelete handleDeleteCancel={handleDeleteCancel} handleDeleteConfirm={handleDeleteConfirm} />}
      <Typography variant="h3" sx={{ marginBottom: "20px", color: "#d32f2f", textAlign: "center" }}>
        Manage Courses
      </Typography>
      <TableContainer component={Paper} sx={{ maxWidth: '1000px', margin: 'auto', marginTop: '20px' }}>
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
        <DialogTitle>{modalAction === 'add' ? 'Add Course' : 'Edit Course'}</DialogTitle>
        <DialogContent>
          {/* Add your input fields here */}
          <TextField
            label="Name"
            value={modalData.name || ''}
            onChange={(e) => setModalData({ ...modalData, name: e.target.value })}
            fullWidth
            margin="normal"
            required  
            error={modalData.name === ''}
            helperText={modalData.name === '' ? 'First name is required' : ' '}
          />
          <TextField
            label="Course Code"
            value={modalData.courseCode || ''}
            onChange={(e) => setModalData({ ...modalData, courseCode: e.target.value })}
            fullWidth
            margin="normal"
            required  
            error={modalData.courseCode === ''}
            helperText={modalData.courseCode === '' ? 'Course code is required' : ' '}
          />
          <TextField
            label="Description"
            value={modalData.description || ''}
            onChange={(e) => setModalData({ ...modalData, description: e.target.value })}
            fullWidth
            margin="normal"
            multiline
            rows={5}
          />
          <TextField
            label="Syllabus"
            value={modalData.syllabus || ''}
            onChange={(e) => setModalData({ ...modalData, syllabus: e.target.value })}
            fullWidth
            margin="normal"
            multiline
            rows={5}
          />
          <Autocomplete
            id="instructor"
            sx={{ width: 300 }}
            open={open}
            onOpen={() => {
              setOpen(true);
            }}
            onClose={() => {
              setOpen(false);
            }}

            onChange={(event, value) => { value && setModalData({ ...modalData, instructorId: value.id, instructorName: value.firstName + " " + value.lastName }) }}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => { return (option.firstName + " " + option.lastName) }}
            options={options}
            value={modalData.instructorId ? { firstName: modalData.instructorName, lastName: "" } : null}
            loading={autocompleteLoading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Instructor"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {autocompleteLoading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
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
export default CourseTable;