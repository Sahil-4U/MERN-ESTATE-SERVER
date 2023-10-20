import User from "../modals/User.modal.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/Error.js";

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
    const { email, password } = req.body;
    const emailValidate = await User.findOne({ email });
    if (!emailValidate) return next(errorHandler(404, 'User not found please Sing Up first'));
    const comPassword = bcryptjs.compareSync(password, emailValidate.password);
    if (!comPassword) return next(errorHandler(404, 'Wrong Credentials'));
}