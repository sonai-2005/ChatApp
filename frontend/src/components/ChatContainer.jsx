import React, { useEffect, useRef } from 'react'
import { usechatStore } from '../store/usechatStore'
import { useAuthStore } from '../store/useAuthStore'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import MessageSkeleton from './skeleton/MessageSkeleton'
import { formatMessageTime } from '../lib/utils'
import { SunMoon } from 'lucide-react'
import { io, Socket  } from 'socket.io-client'

function ChatContainer() {
    const { isMessagesLoading, users ,messages, getMessage, selectedUser , subscribeToMessage , unSubscribe , typingStatus  } = usechatStore();
    const { onlineUsers } = useAuthStore();
    const { authUser } = useAuthStore();
    const messageEndRef = useRef(null);
    const socket = useAuthStore.getState().socket;

    useEffect(() => {
        if (!selectedUser && users.length > 0) {
            selectedUser(users[0]);
        }
    }, [users, selectedUser, selectedUser]);
 
    useEffect(() => {
        if(selectedUser?._id){
        getMessage(selectedUser._id);
        subscribeToMessage();
        return ()=>unSubscribe();
        }

    }, [selectedUser?._id, getMessage, subscribeToMessage , unSubscribe])
    useEffect(()=>{
        if(messages && messageEndRef.current)
        messageEndRef.current.scrollIntoView({behaviour:"smooth"});
    },[messages])

    if (isMessagesLoading) return (
        <div className="flex-1 flex flex-col overflow-auto">
            <ChatHeader />
            <MessageSkeleton />
            <MessageInput />
        </div>
    );


   return (
    
        <div className='flex-1 flex flex-col h-110 '>
            <ChatHeader />
            
            {/* messages container */}

            <div className="flex-1 overflow-y-auto space-y-4">
                {messages.map((message) => (
                    <div key={message._id}
                        className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                        ref={messageEndRef}
                    >
                        <div className='chat-image avatar'>
                            <div className="size-7 rounded-full border">
                                <img src={message.senderId === authUser._id ? authUser.profilePic || "./avatar.png" : selectedUser.profilePic || "avatar.png"} 
                                alt="userImage" />
                            </div>
                        </div>
                        <div className='chat-header mb-1'>
                            <time className='text-xs opacity-50 ml-1'>
                                {formatMessageTime(message.createdAt)}
                            </time>
                        </div>
                        <div className="chat-bubble flex flex-col">
                            {message.image && (
                                <img
                                    src={message.image}
                                    alt="Attachment"
                                    className="sm:max-w-[200px] rounded-md mb-2"
                                />
                            )}
                            {message.text && <p>{message.text}</p>}
                        </div>
                    </div>
                ))}
               
            </div>
        <MessageInput />
            

        </div>
    )
}

export default ChatContainer