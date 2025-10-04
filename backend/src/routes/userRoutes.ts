import { Router } from 'express';
import { getUsers, createUser } from '../controllers/userController'

//part of express.js
//routes map URLs to controller functions

const router = Router();

router.get('/users', getUsers);
router.post('/createUser', createUser);

export default router;