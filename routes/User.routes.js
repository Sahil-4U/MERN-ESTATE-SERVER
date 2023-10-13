import express from "express";

const UserRouter = express.Router();

UserRouter.get('/test', (req, res) => {
    res.send('Hi Node js, I am willing to work with you');
})

export default UserRouter;