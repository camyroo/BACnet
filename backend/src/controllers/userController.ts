import { Request, Response } from 'express';
import prisma from '../db';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, username } = req.body;
    
    const user = await prisma.user.create({
      data: {
        email,
        username,
      },
    });
    
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: 'User creation failed' });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};