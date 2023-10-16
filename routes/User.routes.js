import express from "express";
import { UserController } from '../controller/UserController.js';
const UserRouter = express.Router();

UserRouter.get('/test', UserController);

export default UserRouter;