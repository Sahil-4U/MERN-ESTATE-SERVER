import { errorHandler } from "./Error";
import { Jwt } from "jsonwebtoken";

export const Verifytoken = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) return next(errorHandler(403, 'User not authorized forbidden'));

    Jwt.verify(token, process.env.Jwt_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, 'Your are not authorized for this route'));
        req.user = user;
        next()
    });
}