import express from 'express';
import { singup } from '../controller/AuthController.js';

const authRouter = express.Router();

authRouter.post("/sing-up", singup);

export default authRouter;