import { Router } from 'express';
import { getUsers } from '../controllers/userController'

//part of express.js
//routes map URLs to controller functions

const router = Router();

router.get('/users', getUsers)

export default router;