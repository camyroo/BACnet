import { Router } from 'express';
import * as user from '../controllers/userController';

//part of express.js
//routes map URLs to controller functions

const router = Router();

router.get('/users', user.getUsers);
router.get('/users/:id', user.getUserById);
router.get('/users/:email', user.getUserByEmail)

router.put('/users/:id', user.updateUserById)
router.patch('/users/:status', user.updateUserStatus)
router.post('/users', user.createUser)
router.delete('/users/:id', user.deleteUserId)

export default router;