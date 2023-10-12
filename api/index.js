import express from "express";
import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();


// mongodb connection
mongoose.connect(process.env.mongouri)
    .then(() => console.log('mongodb connected successfully'))
    .catch((error) => console.log(error))


const app = express();



app.listen(6450, () => {
    console.log('hello port is listning at 6450')
})