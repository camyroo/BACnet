import dotenv from 'dotenv';
dotenv.config(); 

import express from 'express';
import router from './routes/userRoutes';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); 
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});