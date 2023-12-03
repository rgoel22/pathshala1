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

const CourseTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Fetch data from the API when the component mounts
        fetch('https://pathshala-api-8e4271465a87.herokuapp.com/pathshala/courses')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleEditClick = (id) => {
        console.log(`Edit button clicked for id ${id}`);
    };

    const handleDeleteClick = (id) => {
        console.log(`Delete button clicked for id ${id}`);
    };

    // Assuming data is an array of objects with fields like 'name', 'courseCode' etc.
    let userId;
    const headers = [["name", 'Name'], ["courseCode", 'Course Code'], ["description", 'Description'], ["syllabus", 'Syllabus'],
        ['instructorName', 'Instructor Name']];

    return(
        <TableContainer component={Paper} sx={{ maxWidth: '1000px', margin: 'auto', marginTop: '20px' }}>
            <div style={{ textAlign: 'right', margin: '10px' }}>
                <IconButton color="primary" aria-label="add" onClick={() => console.log('Add button clicked')}>
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
                                <IconButton color="primary" aria-label="edit" onClick={() => handleEditClick(row.userId)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton color="secondary" aria-label="delete" onClick={() => handleDeleteClick(row.userId)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </TableContainer>
    );
};
export default CourseTable;