import { Router } from 'express';
import { createUser, getUsers } from '../controllers/userController';

//routes map URLs to controller functions

const router = Router();

router.post('/users', createUser);  // POST /users
router.get('/users', getUsers);     // GET /users

export default router;