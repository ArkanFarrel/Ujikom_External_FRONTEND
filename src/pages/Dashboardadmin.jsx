import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import SidebarComponent from '../components/Sidebar.jsx';
import { Box } from '@mui/material';

const columns = [
  { id: 'name', label: 'Admin Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'action', label: 'Action', minWidth: 100, align: 'center' },
];

const Dashboardadmin = () => {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: ''});
  const [deleteId, setDeleteId] = useState(null);
  const [editAdmin, setEditAdmin] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3008/admin');
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setRows([]);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3008/admin/post', newAdmin);
      handleClose();
      setRows((prevRows) => [...prevRows, response.data]); 
    } catch (error) {
      console.error("Terjadi Kesalahan Menambah Data", error);
    }
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`http://localhost:3008/admin/update/${editAdmin}`, newAdmin);
      setEditOpen(false);
      fetchData();
      setNewAdmin({ name: '', email: '' });
      setEditAdmin(null);
    } catch (error) {
      console.error("Terjadi Kesalahan Update Data", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (!deleteId) {
        console.error('Invalid property ID');
        return;
      }
  
      const deleteUrl = `http://localhost:3008/admin/delete/${deleteId}`;
      console.log(`Menghapus Data Property Dengan ID: ${deleteId}`);
      console.log(`Delete URL: ${deleteUrl}`);
      await axios.delete(deleteUrl);
      
      // Hapus data dari tabel setelah berhasil
      setRows((prevRows) => prevRows.filter(row => row.id !== deleteId));
  
      setDeleteId(null);
      setConfirmOpen(false); 
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          console.error('Data Admin Tidak Ditemukan');
        } else {
          console.error(`Error: ${error.response.status} - ${error.response.statusText}`);
        }
      } else {
        console.error('Server Tidak Merespon', error.message);
      }
  
      setConfirmOpen(false); 
    }
  };
  

  const handleDeleteClick = (id) => {
    if (!id) {
      console.error('Invalid property ID');
      return;
    }
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const handleAddClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewAdmin({ name: '', email: '' });
  };

  const handleChange = (e) => {
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
  };

  const handleEditClick = (row) => {
    setEditAdmin(row.id);
    setNewAdmin({ name: row.name, email: row.email });
    setEditOpen(true);
  };

  const handleCancelDelete = () => {
    setConfirmOpen(false);
    setDeleteId(null); 
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex">
      <SidebarComponent />
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 1000 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(rows) && rows.map((row) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'action' ? (
                          <Box display="flex" justifyContent="flex-start" alignItems="center" gap={1}>
                            <Button variant="outlined" onClick={handleAddClick}>Add</Button>
                            <Button variant="outlined" startIcon={<EditIcon />} onClick={() => handleEditClick(row)}>Edit</Button>
                            <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDeleteClick(row.id)}>Delete</Button>
                          </Box>
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

              {/* Popup add new Property disini */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Property</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" name="name" label="Admin Name" fullWidth value={newAdmin.name} onChange={handleChange} />
          <TextField margin="dense" name="email" label="Email" fullWidth value={newAdmin.email} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

      {/* Popup edit Property Disini */}
      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Edit Property</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" name="name" label="Admin Name" fullWidth value={newAdmin.name} onChange={handleChange} />
          <TextField margin="dense" name="email" label="Email" fullWidth value={newAdmin.email} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

      {/* Popup delete Property Disini */}
      <Dialog open={confirmOpen} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this property?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboardadmin;
