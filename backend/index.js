import express from 'express';
import dotenv from 'dotenv';
import dbConnection from "./utils/index.js";

dotenv.config();
dbConnection()
const app = express();
const PORT = 5000;


app.use(express.json());




app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export { database };