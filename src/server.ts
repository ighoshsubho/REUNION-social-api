import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import followRoutes from './routes/followRoutes';
import userRoute from './routes/userRoute';
import postRoute from './routes/postRoute';
import likeRoute from './routes/likeRoute';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', authRoutes);
app.use('/api', followRoutes);
app.use('/api', userRoute);
app.use('/api', postRoute);
app.use('/api', likeRoute);

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Connect to database and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log('Server started on port 3000');
    });
  })
  .catch((error) => {
    console.error(error);
  });
