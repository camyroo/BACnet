'use client';

import { useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  username: string;
  createdAt: string;
}

export default function Home() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const fetchUsers = async () => {
    const res = await fetch('http://localhost:3001/api/users');
    const data = await res.json();
    setUsers(data);
  };

  const createUser = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('http://localhost:3001/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, username }),
    });
    setEmail('');
    setUsername('');
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();

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

      <h2>All Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}