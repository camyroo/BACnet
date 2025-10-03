'use client';

import { useEffect, useState } from 'react';

// TypeScript definition matching your PostgreSQL schema
// State variables: variables that trigger re-renders when changed
interface User {
  id: string;
  email: string;
  username: string;
  discriminator: string;
  created_at: string;
  sub_tier: string;
  stripe_customer_id: string | null;
}

export default function Home() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  // Fetching users via GET request
  // 1. Makes a GET request to /api/users backend
  // 2. Converts response to JSON
  // 3. Updates the users state with the data
  // 4. When users updates, component re-renders

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:3001/api/users');
      const data = await res.json();
      
      // Check if response is an array
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error('Expected array, got:', data);
        setError('Failed to fetch users: ' + (data.error || 'Invalid response'));
      }
    } catch (err: any) {
      console.error('Fetch error:', err);
      setError('Failed to fetch users: ' + err.message);
    }
  };

  // Creating a user via POST request
  // 1. Prevents default form submission
  // 2. Sends POST request with email and username to backend
  // 3. Clears the form inputs
  // 4. Fetches updated user list which re-renders state vars

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault(); // stop form from refreshing the page

    await fetch('http://localhost:3001/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username }), // send form data
    });

    setEmail('');     // clear form
    setUsername('');  //
    fetchUsers();     // refresh user list
  };

  // On component load
  // 1. Runs automatically when page first loads
  // 2. Fetches all users in state vars
  // 3. Checks if backend is running
  useEffect(() => {
    fetchUsers(); // get all users when page loads

    // test backend connection
    fetch('http://localhost:3001/api/health')
      .then(res => res.json())
      .then(data => {
        setMessage(data.message);
      })
      .catch(err => {
        setError('Failed to connect: ' + err.message);
      });
  }, []);

  return (
    <div>
      <h1>BACnet Test</h1>
      {error && <p>Error: {error}</p>}
      {message && <p>Backend: {message}</p>}

      <h1>Users</h1>

      {/* Form to create new user */}
      <form onSubmit={createUser}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Create User</button>
      </form>

      <table className="relative overflow-x-auto">
        <thead>
          <tr className="text-left bg-gray-700">
            <th className="px-2">Id</th>
            <th className="px-2">Email</th>
            <th className="px-2">Username</th>
            <th className="px-2">Discriminator</th>
            <th className="px-2">Created At</th>
            <th className="px-2">Sub Tier</th>
            <th className="px-2">Stripe Customer</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-2">{user.id}</td>
              <td className="px-2">{user.email}</td>
              <td className="px-2">{user.username}</td>
              <td className="px-2">{user.discriminator}</td>
              <td className="px-2">{new Date(user.created_at).toLocaleString()}</td>
              <td className="px-2">{user.sub_tier}</td>
              <td className="px-2">{user.stripe_customer_id || 'None'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}