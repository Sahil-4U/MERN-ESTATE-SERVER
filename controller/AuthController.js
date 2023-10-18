import User from "../modals/User.modal.js";
import bcryptjs from 'bcryptjs';

export const singup = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const userDB = new User({ username, email, password: hashedPassword });
    try {
        await userDB.save();
        res.status(201).json("User created successfully!!!");
    } catch (error) {
        res.status(500).json(error.message);
    }
}