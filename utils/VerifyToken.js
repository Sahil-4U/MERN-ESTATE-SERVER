import { errorHandler } from "./Error.js";
import jwt from "jsonwebtoken";

export const Verifytoken = (req, res, next) => {
    console.log(req.cookies.jwtToken);
    const token = req.cookies.jwtToken;

    if (!token) return next(errorHandler(403, 'User not authorized forbidden'));

    jwt.verify(token, process.env.Jwt_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, 'Your are not authorized for this route'));
        req.user = user;
        next()
    });
}