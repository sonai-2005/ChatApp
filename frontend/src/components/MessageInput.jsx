import React, { useRef } from 'react'
import { usechatStore } from '../store/usechatStore';
import { X, Image, Send, FileType, User } from "lucide-react"
import toast from 'react-hot-toast';

import { useAuthStore } from '../store/useAuthStore';
const socket = useAuthStore.getState().socket;



const MessageInput = () => {
    const [text, setText] = React.useState("");
    const [preview, setPreview] = React.useState(null);
    const fileInputRef = useRef(null);
    const { sendMessage, setTypingForUser , selectedUser } = usechatStore();
    //=> to do the typing feature...
    const receiverId = selectedUser?._id;
    
    const currentChatUserId =receiverId ;

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
            toast.error("Only image files are allowed!");
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        }
        reader.readAsDataURL(file);

    }
    const removeImage = () => {
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";

    }
    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!text.trim() && !preview) return;
        try {
            await sendMessage({
                text: text.trim(),
                image: preview,
            });
            //clear
            setText("");
            
            setPreview(null);
            if (fileInputRef.current) fileInputRef.current.value = null;
        } catch (error) {
            console.log("failed to send message", error.Message);
            toast.error("can't send message");
        }
    }
    return (
        <div className="pl-5 pr-5 w-full">
            {preview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
                            type="button"
                        >
                            <X className="size-3" />
                        </button>
                    </div>
                </div>
            )}
            <form onSubmit={handleSendMessage} className='flex items-center gap-2'>
                <div className='flex-1 flex  gap-2'>
                    <input
                        type="text"
                        className="w-full input input-bordered rounded-lg input-sm sm:input-md"
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => {
                            const val = e.target.value;
                            setText(val);
                            
                            
}}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                    <button
                        type="button"
                        className={`hidden sm:flex btn btn-circle
                     ${preview ? "text-emerald-500" : "text-zinc-400"}`}
                        onClick={() => fileInputRef.current?.click()}
                    >
                        <Image size={20} />
                    </button>
                    <button
                        type="submit"
                        className="btn btn-sm btn-circle"
                        disabled={!text.trim() && !preview}
                    >
                        <Send  size={22} />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default MessageInput