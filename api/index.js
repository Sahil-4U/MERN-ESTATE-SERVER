import express from "express";
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from "../routes/User.routes.js";
import authRouter from '../routes/Auth.routes.js';
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
dotenv.config();




// mongodb connection
mongoose.connect(process.env.mongouri)
    .then(() => console.log('mongodb connected successfully'))
    .catch((error) => console.log(error))


const app = express();

// middle ware
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};


// cors package
app.use(cors(corsOptions));

// cookie parser package for read cookies
app.use(cookieParser());

app.listen(6400, () => {
    console.log('server is listning');
})
app.get('/', (req, res) => {
    res.send('<center><h1>Welcome</h1></center>');
})

app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json(
        {
            success: false,
            statusCode,
            message
        }
    )
});

