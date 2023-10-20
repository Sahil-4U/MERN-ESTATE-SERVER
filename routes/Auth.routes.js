import express from 'express';
import { signin, singup } from '../controller/AuthController.js';

const authRouter = express.Router();

authRouter.post("/sing-up", singup);
authRouter.post("/sign-in", signin);

export default authRouter;