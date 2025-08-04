import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast"
import { io } from "socket.io-client";
import LogoutMessage from "../components/LogoutMessage";
const ioPort = import.meta.env.MODE==="development"?`http://localhost:5001`:"/";



export const useAuthStore = create((set , get)=>({
    authUser :null,
    isSigningIn:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth :true,
    onlineUsers:[],
    socket:null,

    checkAuth:async()=>{
        try {
            const res =await axiosInstance.get("auth/check")
            set({authUser:res.data});
            get().connectSocket();
        } catch (error) {
                LogoutMessage();
            console.log("error in the useAuthStore "+error.message);
            set({authUser:null});
            return;
        }
        finally{
            set({isCheckingAuth:false})
        }
    },
    signup: async(data)=>{
         LogoutMessage();
        set({isSigningIn:true});
        try {
            const res = await axiosInstance.post("auth/signup" , data);
            set({authUser:res.data});
            
            toast.success("account created successfully ");
            get().connectSocket();

        } catch (error) {
            console.log("in the use authstore eror");
            toast.error(error.response.data.message);
        }
        finally{
            set({isSigningIn:false});
        }
    },
    logout:async()=>{
         
        try {
            await axiosInstance.post("auth/logout");  
            toast.success("logged out successsfully ")
            set({authUser:null});
            get().disconnectSocket();
        } catch (error) {
             get().disconnectSocket();
            console.log("log out prob", error.message)
            //toast.error(error.response?.data?.message);
            
        }
    },
    login:async(data)=>{
        set({isLoggingIn:true});
        try {
           const res= await axiosInstance.post("auth/login" , data);
           set({authUser:res.data});
           toast.success("log in success ");
           set({isLoggingIn:false})
           get().connectSocket();
        } catch (error) {
            set({isLoggingIn:false})
            console.log("error in the logout in useauthstore");
            toast.error(error.response.data.message);
        }
    },
    updateProfile:async(data)=>{
        set({isUpdatingProfile:true});
        try {
            const res =  await axiosInstance.put("auth/update-profile",data);
            set({authUser:res.data});
            set({isUpdatingProfile:false});
            toast.success("profile updated successfully "); 
        } catch (error) {
            console.log("update error in useauthstore ! ",error.message);
            set({isUpdatingProfile:false})
            toast.error("update error");
        }
    },
    connectSocket:()=>{
        const {authUser} = get();
        if(!authUser || get().socket?.connected)return;
        
        
        const socket = io(ioPort,{
            query:{userId:authUser._id}
            
        });
        socket.connect();
        set({socket:socket});
        
        socket.on("getOnlineUsers" ,(userIds)=>{
            set({onlineUsers:userIds})
        } )
    },
    disconnectSocket:()=>{
        const socket = get().socket;
        if( socket?.connected)socket.disconnect();
    },
}));