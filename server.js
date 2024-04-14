import express from 'express';
import dotenv from "dotenv";
import { connectdb } from './config/dbconnection.js';
import router from './routes/reciperoute.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url'; 


const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 


dotenv.config();
const app = express()
const port = 5000 || process.env.PORT;

connectdb()

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));
app.use("/api/recipe",router);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))