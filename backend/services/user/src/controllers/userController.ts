import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();

    res.json(users);

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const users = await userService.getUserById(id);

    res.json(users);

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user by id' })
  }
}

export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const users = await userService.getUserByEmail(email);

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user by email'})
  }
}

export const updateUserById = async (req: Request, res: Response) => {

}

export const updateUserStatus = async (req: Request, res: Response) => {

}


export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;
    const newUser = await userService.createNewUser(email, name);

    res.status(201).json(newUser);

  } catch (error) {
    res.status(400).json({ error: 'Failed to create user' });
  }
};

export const deleteUserId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await userService.deleteUser(id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(deletedUser);

  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};