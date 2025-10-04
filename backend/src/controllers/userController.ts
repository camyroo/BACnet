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