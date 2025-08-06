import toast from "react-hot-toast";
import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";
import notificationSound from "./notify.mp3"

export const usechatStore=create((set , get)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUserLoading:false,
    isMessagesLoading:false,
    
    
    getUser:async()=>
    {
        set({isUserLoading:true});
        try {
            const res = await axiosInstance.get("/messages/users");
            set({users:res.data});
        } catch (error) {
            console.log("here is a error in the useChatStore in getUser::"+error.message);
            toast.error(error?.response?.data?.message || "Something went wrong");

        }
        finally{
            set({isUserLoading:false});
        }
    },
    getMessage:async(userId)=>{
        set({isMessagesLoading:true});
        try {
            if (!userId) {
    console.warn("getMessage called with invalid userId:", userId);
    return;
  }
            const res = await axiosInstance.get(`/messages/chat/${userId}`);
            //console.log("id is : " , userId);

            // console.log("messages : "+res.data);
            set({messages:res.data});

        } catch (error) {
            console.log("here is an error in fetching chats::"+error.message);
            toast.error(error.response.data.message);
        }finally{
            set({isMessagesLoading:false});
        }
    },
    sendMessage:async(messageData)=>{
        const {selectedUser , messages} = get();
         if (!selectedUser?._id) {
    
    toast.error("No user selected");
    return;
  }
        try {

            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}` , messageData);
            set({messages:[...messages , res.data]})

        } catch (error) {
            console.log("here is a error in the usechat send Message: ", error.message);
            toast.error("try again");
        }
    },

subscribeToMessage: () => {
    if(!get().selectedUser){
         toast("📥 New message received");
    const notifyAudio = new Audio(notificationSound);
    notifyAudio.play().catch((err) =>
      console.warn("Audio play failed:", err)
    )
    return;
    }
  const socket = useAuthStore.getState().socket;

  socket.on("tapToSee", (newMessage) => {
    const currentSelectedUser = get().selectedUser;

    const isNoChatOpen = !currentSelectedUser;
    const isSameChat = newMessage.senderId === currentSelectedUser?._id;

    if (isSameChat) {
      // ✅ CASE 1: Same user → just append
      set({
        messages: [...get().messages, newMessage],
      });
      return; // Don't notify
    }

    // ✅ CASE 2 & 3: Other chat OR no chat → notify
    toast("📥 New message received");
    const notifyAudio = new Audio(notificationSound);
    notifyAudio.play().catch((err) =>
      console.warn("Audio play failed:", err)
    );

    // ⛔ Do NOT append the message here
    // It will be fetched via `getMessage` when user clicks that user
  });
},


    // subscribeToMessagebackup:()=>{
    //     const {selectedUser} = get();
        
    //     const socket = useAuthStore.getState().socket;


    //     socket.on("tapToSee", (newMessage)=>{
            
    //       if(newMessage.senderId===selectedUser._id)return;
    //       const currentSelectedUser = get().selectedUser;
    //       if (newMessage.senderId !== currentSelectedUser?._id) {
        
    //   const notifyAudio = new Audio(notificationSound);
    //   notifyAudio.play().catch(err => {
    //     console.warn("Audio play failed:", err);
    //   });
    // }
          
    //         set({
    //             messages:[...get().messages , newMessage],
    //         })
    //     })
    // },
    unSubscribe:()=>{
    const socket = useAuthStore.getState().socket;
    socket.off("tapToSee");
    },
    setSelectedUser:(selectedUser)=>set({selectedUser}),
    
    
    
}))