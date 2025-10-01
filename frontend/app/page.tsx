'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
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
    </div>
  );
}