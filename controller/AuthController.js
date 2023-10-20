import User from "../modals/User.modal.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/Error.js";
import jwt from 'jsonwebtoken';

export const singup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const userDB = new User({ username, email, password: hashedPassword });
    try {
        await userDB.save();
        res.status(201).json("User created successfully!!!");
    } catch (error) {
        next(error);
    }
};
export const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const Validater = await User.findOne({ email });
        if (!Validater) return next(errorHandler(404, 'User not found please Sing Up first'));
        const comPassword = bcryptjs.compareSync(password, Validater.password);
        if (!comPassword) return next(errorHandler(404, 'Wrong Credentials'));

        const token = jwt.sign({ id: Validater._id }, process.env.JWT_SECRET);

        const { password: pass, ...rest } = Validater._doc;

        res.cookie('access token', token, { httpOnly: true }).status(200).json(rest);
    } catch (error) {
        next(error);
    }
};