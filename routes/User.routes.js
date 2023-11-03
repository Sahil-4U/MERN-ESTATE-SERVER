import express from "express";
import { UserController, updateUser } from '../controller/UserController.js';
import { Verifytoken } from "../utils/VerifyToken.js";
const userRouter = express.Router();

userRouter.get('/test', UserController);
userRouter.post('/update/:id', Verifytoken, updateUser);

export default userRouter;  