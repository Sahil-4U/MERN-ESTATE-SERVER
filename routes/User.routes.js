import express from "express";
import { UserController } from '../controller/UserController.js';
const userRouter = express.Router();

userRouter.get('/test', UserController);

export default userRouter;  