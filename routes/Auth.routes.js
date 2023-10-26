import express from 'express';
import { google, signin, singup } from '../controller/AuthController.js';

const authRouter = express.Router();

authRouter.post("/sing-up", singup);
authRouter.post("/sign-in", signin);
authRouter.post('/google', google)

export default authRouter;