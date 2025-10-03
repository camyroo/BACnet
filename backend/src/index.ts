import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';

dotenv.config();

// DEBUG
console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('Type:', typeof process.env.DATABASE_URL);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());

app.get('/api/health', (req, res) => {
  console.log('Health endpoint hit!');
  res.json({ status: 'ok', message: 'Server is running' });
});

app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});