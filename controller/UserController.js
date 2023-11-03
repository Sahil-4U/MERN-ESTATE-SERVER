import User from "../modals/User.modal.js";
import { errorHandler } from "../utils/Error.js";
import bcrypt from 'bcryptjs';

export const UserController = (req, res) => {
    res.send('hi I am controller');
}

export const updateUser = async (req, res, next) => {

    if (req.user.id !== req.params.id) return next(errorHandler(403, 'You can update your account only'));
    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            // set method helps us to find values which are updated or not
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            },
        }, { new: true });
        const { password, ...rest } = updatedUser._doc;

        return res.status(200).json(rest);

    } catch (error) {
        next(error);
    }
}