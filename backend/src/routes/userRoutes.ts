import { Router } from 'express';
import { getUsers, createUser, deleteUserId } from '../controllers/userController'

//part of express.js
//routes map URLs to controller functions

const router = Router();

router.get('/users', getUsers);
router.post('/users', createUser)
router.delete('/users/:id', deleteUserId)

export default router;