import { Router } from 'express';
import { createUser, getUsers } from '../controllers/userController';

//part of express.js
//routes map URLs to controller functions


const router = Router();

router.post('/users', createUser);  // POST /users
router.get('/users', getUsers);     // GET /users

export default router;