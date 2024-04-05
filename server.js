import express from 'express';
import dotenv from "dotenv";
import { connectdb } from './config/dbconnection.js';

const app = express()
const port = 5000 || process.env.PORT;

dotenv.config()
connectdb()
app.use(express.json()) 
app.listen(port, () => console.log(`Example app listening on port ${port}!`))