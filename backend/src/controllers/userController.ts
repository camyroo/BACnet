import { Request, Response } from 'express';
import prisma from '../db';

// part of express.js
// this is the controller for user 
// Controllers contain the actual code that handles the request and sends the response.

// Create new user

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, username } = req.body;

    const discriminator = Math.floor(1000 + Math.random() * 9000).toString()

    const user = await prisma.user.create({
      data: {
        email,
        username,
        discriminator
      },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'User creation failed' });
  }
};

// Get all users
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};