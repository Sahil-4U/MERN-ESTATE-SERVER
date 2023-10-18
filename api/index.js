import express from "express";
import mongoose from 'mongoose';
import userRouter from "../routes/User.routes.js";
import authRouter from '../routes/Auth.routes.js';
import dotenv from "dotenv";
dotenv.config();




// mongodb connection
mongoose.connect(process.env.mongouri)
    .then(() => console.log('mongodb connected successfully'))
    .catch((error) => console.log(error))


const app = express();

// middle ware
app.use(express.json());

app.listen(6400, () => {
    console.log('server is listning');
})
app.get('/', (req, res) => {
    res.send('<center><h1>Welcome</h1></center>');
})

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

