import React from 'react'
import { usechatStore } from '../store/usechatStore'
import Sidebar from '../components/Sidebar';
import NoChatSelected from '../components/NochatSelected';
import ChatContainer from '../components/ChatContainer';


const HomePage = () => {
    const { selectedUser } = usechatStore();
    return (
        <div className='h-auto w-full bg-base-200'>
        <div className=" flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-4xl shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
        <div className=" flex rounded-lg space-x-4 ">
        <Sidebar/>
        <div className=' flex w-full h-110  rounded-3xl overflow-hidden border-base-300 border-3'>{!selectedUser?<NoChatSelected/>:<ChatContainer/>}</div>
        </div>
        </div>
        </div>

        </div>
    )
}

export default HomePage