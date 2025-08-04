import User from "../models/user.model.js"
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import {io , getReciever} from '../lib/SocketIo.js'


export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredList = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filteredList);


    } catch (error) {
        console.log("here is a error in the message controller :( " + error);
        res.status(500).json({ error: "internal server error in message controller  13 " });
    }
}

export const getmessages = async (req, res) => {
    try {
        const { id: userTochatId } = req.params;
        const myId = req.user._id;
        const { id: recieverId } = req.params;
        //check
        // console.log("B:my id is : " , myId);
        // console.log("reciever id is : " , recieverId);//recieverId

        const messages = await Message.find(
            {
                $or: [
                    { senderId: myId, recieverId: userTochatId },
                    { senderId: userTochatId, recieverId: myId }
                ]
            }
        )
        res.status(200).json(messages);
    } catch (error) {
        console.log("here is eror in the message controller get message ! " + error);
        res.status(500).json({ error: "error getting messages in the message controller ! " });
    }
}
export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: recieverId } = req.params;
        const myId = req.user._id;
        let imageurl;
        if (image && image.trim() !== "") {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageurl = uploadResponse.secure_url;
        }
        //check
        // console.log("my id is : " , myId);
        // console.log("reciever id is : " , recieverId);//recieverId
        // console.log("image is :",image)
        const newmessage = new Message({
            senderId: myId,
            recieverId,
            text,
            image: imageurl,
        })
        await newmessage.save();
        ///realtime funcinality here=>
        const recieverSocketId = getReciever(recieverId);
        if(recieverSocketId){
            io.to(recieverSocketId).emit("tapToSee" , newmessage);//new message
        }
        res.status(201).json(newmessage);

    } catch (error) {
        console.log("error error error in the send message !  F F F F F F " , error.message);
        res.status(500).json({ message: "internal sever of send message has been F ! " })
    }
}