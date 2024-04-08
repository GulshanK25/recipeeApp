import express from 'express';
import dotenv from "dotenv";
import { connectdb } from './config/dbconnection.js';
import router from './routes/reciperoute.js';
import cors from 'cors';

const app = express()
const port = 5000 || process.env.PORT;

dotenv.config()
connectdb()

app.use(cors());
app.use(express.json()) 
app.use("/api/recipe",router);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))