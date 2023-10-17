import express from 'express';
import { singup } from '../controller/AuthController.js';

const authRouter = express.Router();

authRouter.post("/singup", singup);

export default authRouter;