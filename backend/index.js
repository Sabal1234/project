import express from 'express';
import dotenv from 'dotenv';
import dbConnection from "./utils/index.js";
import userRoutes from './routes/userRoute.js'
dotenv.config();
const app = express();
const PORT = 5000;
app.use(express.json());
app.use('/api/users', userRoutes);

const startServer = async () => {
  try {
    await dbConnection();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('Failed to connect to database:', error.message);
  }
};
startServer();


