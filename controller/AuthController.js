import User from "../modals/User.modal";

export const singup = async (req, res) => {
    const { username, email, password } = req.body;
    const userDB = new User({ username, email, password });
    await userDB.save();
}