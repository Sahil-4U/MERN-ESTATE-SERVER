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
        return res.status(201).json("User created successfully!!!");
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
        console.log(token, rest, "line 28 at authcontoller.js");

        res
            .cookie(`access_token`, token, { httpOnly: true })
            .status(200)
            .json(rest);
    } catch (error) {
        next(error);
    }
};

export const google = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: pass, ...rem } = user._doc;
            return res.cookie(`access_token`, token, { httpOnly: true }).status(200).json(rem);
        } else {
            const password = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = await bcryptjs.hashSync(password, 10);
            const newUserDB = new User({ email: req.body.email, password: hashedPassword, username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4), avatar: req.body.photo })
            const result = await newUserDB.save();
            const token = jwt.sign({ id: result._id }, process.env.JWT_SECRET);
            const { password: pass, ...rest } = result._doc;
            return res
                .cookie(`access_token`, token, { httpOnly: true })
                .status(200)
                .json(rest);
        }
    } catch (error) {
        next(error)
    }
}