import express from "express";
import { UserController, updateUser } from '../controller/UserController.js';
const userRouter = express.Router();

userRouter.get('/test', UserController);
userRouter.post('/update/:id', updateUser);

export default userRouter;  