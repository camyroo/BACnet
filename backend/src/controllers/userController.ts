import { Request, Response } from 'express';
import { query } from '../db';

// Create new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, username } = req.body;
    const discriminator = Math.floor(1000 + Math.random() * 9000).toString();
    
    const result = await query(
      'INSERT INTO users (email, username, discriminator) VALUES ($1, $2, $3) RETURNING *',
      [email, username, discriminator]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error: any) {
    console.error('User creation error:', error);
    
    //  duplicate email
    if (error.code === '23505' && error.constraint === 'users_email_key') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    
    res.status(400).json({ error: 'User creation failed' });
  }
};

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await query('SELECT * FROM users');
    res.json(result.rows);
  } catch (error) {
    console.error('Fetch users error:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};