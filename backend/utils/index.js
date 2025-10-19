import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const dbConnection = async () => {
  const database = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    const client = await database.connect();
    console.log('Database connection established ');
    client.release();
    return database;
  } catch (error) {
    console.error('Database error:'+error.message);
    throw error;
  }
};

export default dbConnection;