import express from 'express';
import dotenv from 'dotenv';
import dbConnection from "./utils/index.js";

dotenv.config();

const app = express();
const PORT = 5000;
dbConnection()

app.use(express.json());




app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

