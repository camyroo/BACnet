'use client';

import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Alert,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';


interface User {
  id: string;
  email: string;
  name: string;
  discriminator: string;
  created_at: string;
  updated_at: string;
  subscription_tier: string;
}

const API_BASE_URL = 'http://localhost:3001/api';

export default function Home() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({ email: '', name: '' });
  const [filterType, setFilterType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Api calls

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`);
      if (!response.ok) throw new Error('Failed to fetch users');

      const data = await response.json();
      setUsers(data);
      setError('');
    } catch (err: any) {
      setError('Failed to fetch users: ' + err.message);
    }
  };

  const createUser = async (email: string, name: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });

      if (!response.ok) throw new Error('Failed to create user');

      const newUser = await response.json();
      setUsers([...users, newUser]);
      setError('');
    } catch (err: any) {
      setError('Failed to create user: ' + err.message);
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete user');

      setUsers(users.filter(user => user.id !== userId));
      setError('');
    } catch (err: any) {
      setError('Failed to delete user: ' + err.message);
    }
  };

  const checkHealth = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      const data = await response.json();
      setMessage(data.message);
    } catch (err: any) {
      setError('Failed to connect: ' + err.message);
    }
  };

  // Event handlers

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser(formData.email, formData.name);
    setFormData({ email: '', name: '' });
  };

  const handleFilterChange = (value: string) => {
    setFilterType(value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const getFilteredUsers = () => {
    if (!searchQuery || !filterType) return users;

    return users.filter(user => {
      const searchLower = searchQuery.toLowerCase();

      switch (filterType) {
        case 'id':
          return user.id.toLowerCase().includes(searchLower);
        case 'email':
          return user.email.toLowerCase().includes(searchLower);
        case 'name':
          return user.name.toLowerCase().includes(searchLower);
        default:
          return true;
      }
    });
  };


  useEffect(() => {
    fetchUsers();
    checkHealth();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        BACnet Test
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {message && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Backend: {message}
        </Alert>
      )}

      <Box sx={{ mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Create User
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            value={formData.email}
            onChange={handleInputChange}
            required
            type="email"
          />
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <Button type="submit" variant="contained">
            Create
          </Button>
        </Box>
      </Box>


      {/* Users Table */}
      <Box sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h5">
            Users
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl variant='standard' sx={{ minWidth: 120 }}>
              <InputLabel>Filter</InputLabel>
              <Select
                value={filterType}
                onChange={(e) => handleFilterChange(e.target.value)}
                label="Filter By"
              >
                <MenuItem value=""><em>None</em></MenuItem>
                <MenuItem value="id">ID</MenuItem>
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="name">Name</MenuItem>
              </Select>

            </FormControl>

            <TextField
              label="Search"
              variant="standard"
              value={searchQuery}
              onChange={handleSearchChange}
              disabled={!filterType}
            />
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Discriminator</TableCell>
                <TableCell>Subscription</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Delete</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.discriminator}</TableCell>
                  <TableCell>{user.subscription_tier}</TableCell>
                  <TableCell>
                    {new Date(user.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => deleteUser(user.id)}>
                      remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>





      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Select User</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="Select User"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {users.map((user) => (
            <MenuItem key={user.id} value={user.id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

    </Container>
  );
}