import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "unauthorised request (no token generated ) !" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "INVALID token ! where the F you get this ! :) " });
        }
        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(404).json({message:"NOT FOUND ! in authMiddleware: ("});
        }
        req.user = user;
        next();
    } 
    catch (error) {
        console.log("error in the middleware ->"+error.message);
        return res.status(500).json({message:"internal server error : authMiddleware :( "});
    }

}