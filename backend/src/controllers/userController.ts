import {Request, Response} from 'express';
import pool from '../db'

// Controller functions handle the logic for each route
// They interact with services/models to perform operations

//get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * from users');
    res.json(result.rows)
  } catch (error) {
    console.error('ERROR: getUsers failed to fetch: ', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;

    const discriminator = Math.floor(1000 + Math.random() * 9000).toString();

    const result = await pool.query('INSERT INTO USERS (email, name, discriminator) VALUES ($1, $2, $3) RETURNING *',
      [email, name, discriminator]
    )
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user'})
  }
}