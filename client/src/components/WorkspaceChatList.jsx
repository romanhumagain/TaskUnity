import React from 'react'
import { useAuth } from '../context/AuthContext'
import user_img from '../assets/pp.webp'
import { IoMdDoneAll } from "react-icons/io";
import { IoMdSend } from "react-icons/io";

const WorkspaceChatList = ({ message }) => {
  const { user } = useAuth();
  return (
    <>
      {message && message?.sender !== user._id ? (
        <div className={`p-1 grid grid-cols-12 gap-2 mb-2`} key={message.id}>
          <div className='col-span-1 flex flex-col justify-end pb-1'>
            <img src={message.senderProfile?.profileImage ?message.senderProfile?.profileImage : user_img } className='h-7 w-7 rounded-full' alt="User" />
          </div>
          <div className='col-span-8 flex flex-col justify-start'>
            <p className='text-sm text-gray-600 dark:text-neutral-400 mb-1 px-1'>{message?.senderDetails?.full_name}</p>
            <div className='bg-gray-300 dark:bg-neutral-800 dark:text-white/90 rounded-lg p-1  inline'>
              <p className='inline py-[2px] rounded-lg '>{message.message}</p>
              <p className='text-xs text-gray-500 dark:text-gray-300 flex justify-end mb-1'>{new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
            </div>
          </div>
        </div>
      ) : (

        <div className="p-1 grid grid-cols-12 mb-2 pr-2">
          <div className="col-span-12 flex justify-end">
            <div className="bg-slate-300 dark:bg-zinc-700 dark:text-white/90 rounded-lg p-2 max-w-xs">
              <p className="inline py-[2px] rounded-lg">{message.message}</p>
              <div className="flex gap-1 justify-end items-center mt-1">
                <p className='text-xs text-gray-500 dark:text-gray-300 flex justify-end mb-1'>{new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}</p>
                <div className='flex items-end justify-end pr-2'>
                  <IoMdDoneAll className='text-sm text-sky-400' />
                </div>
              </div>

            </div>
          </div>
        </div>




      )}

    </>
  )
}

export default WorkspaceChatList