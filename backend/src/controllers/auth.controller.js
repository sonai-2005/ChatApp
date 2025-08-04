import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
    //console.log("Request Body:", req.body);  // 👈 add this line
    try {
        if(!fullName || !email || !password){
            return res.status(400).json({ message: "all fields mush be filled ! " });
        }
        if (password.length <= 8) {
            return res.status(400).json({ message: "password must be >=8 character long" });
        }
        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "email already exsists" });

        const salt = await bcrypt.genSalt(10);
        const hashPassword= await bcrypt.hash(password,salt);
        const newUser =  new User(
            {
                fullName:fullName,
                email:email,
                password:hashPassword,
            }
        );
        await newUser.save(); 
        if(newUser){
            //token space..
            generateToken(newUser._id , res);
              
            res.status(200).json({_id:newUser._id,
            fullName:newUser.fullName,
            email:newUser.email,
            profilePic:newUser.profilePic,
            })
        }
        else return res.status(404).json({message:"INVALID DATA in the auth controller ! "} );


    } catch (error) {
        console.log("error in the signup controller--" + error.message);
        res.status(500).json({message:"internal server error ! (auth controller )"});   
    }

};
export const login = async(req, res) => {
   const {email , password} = req.body;
   try {
    const user = await User.findOne({email});
    if(!user){
        return res.status(400).json({messgae:"invaild data ! or does not exist !"});
    }
    else{
        const isPasswordCorrect = await bcrypt.compare(password , user.password);
        if(!isPasswordCorrect){
           return res.status(400).json({message:"invalid details"});
        }
        else{
            generateToken(user._id,res);
            return res.status(200).json({
                _id:user._id,
                fullName:user.fullName,
                email:user.email,
                profilePic:user.profilePic,

        });
        }
    }
   } catch (error) {
    console.log("here is a error in the authController.js file with "+" "+ error.message);
    return res.status(500).json({message:"internal server error ! "});
   }

};
export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 0, // expire immediately
        });

        return res.status(200).json({message:"Logged out successfully!"});
    } catch (error) {
        console.error("Error in logout controller:", error.message);
        return res.status(500).json({message:"invalid credentials"});
    }
};
export const updateProfile = async(req , res)=>{
    try {
        const {profilePic} = req.body;
        const userId = req.user._id;
        if(!profilePic){
            console.log("no profile pic found ! in auth controller");
            return res.status(400).json({message:"no profile pic found ! "});
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId ,{profilePic:uploadResponse.secure_url} , {new:true});
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(" Error in update profile:", error.message);
        return res.status(500).json({message:"error in the update profile"});
    }
};
export const checkAuth = (req , res)=>{
    try {
        res.status(200).json(req.user);

    } catch (error) {
        console.log("here is error in the auth collector check auth :( "+" "+error);
        res.status(500).json({message:"internal server error in the checkAuth.. !"});
    }
}