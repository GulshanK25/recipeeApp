import express from 'express';
import dotenv from "dotenv";




const app = express()
const port = 5000 || process.env.PORT;

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))