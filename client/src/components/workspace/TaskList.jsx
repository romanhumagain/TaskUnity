import React from 'react'
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { IoIosMore } from "react-icons/io";
import { FaCircle } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { BiMessageDetail } from "react-icons/bi";
import { FaUsersViewfinder } from "react-icons/fa6";
import { IoAddOutline } from "react-icons/io5";

const TaskList = () => {
  return (
    <>
      <div className="bg-gray-200 dark:bg-neutral-800 max-w-sm w-full p-5 px-7 mb-8 rounded-2xl shadow-xl min-h-64">
        <div className='flex justify-between items-center'>
          <p className='flex items-center gap-2 text-neutral-800 dark:text-gray-200'><MdKeyboardDoubleArrowUp />High Priority</p>
          <p className='text-xl text-neutral-800 dark:text-gray-200'><IoIosMore /></p>
        </div>
        <div className='text-neutral-800 dark:text-gray-200 mt-4'>
          <p className='text-[16px] flex gap-2 items-center font-semibold truncate'><FaCircle className='text-red-500' />Adding Authentication and Authorization</p>
        </div>
        <div className='text-neutral-600 dark:text-neutral-400 mt-3'>
          <p className='text-sm'>Lorem ipsum dolor sit ame bus voluptates reiciendis quaerat illo.</p>
        </div>
        <p className='text-end text-sm text-neutral-500 dark:text-neutral-500'>29 Jan-2024</p>
        <hr className='border border-gray-300 dark:border-neutral-700 mt-2' />
        <div className='mt-3 flex justify-between' >
          <div className='flex items-center gap-4 text-neutral-600 dark:text-gray-400'>
            <p className='flex items-center gap-1 font-semibold '><FaListUl className='text-sm' /> 2 </p>
            <p className='flex items-center gap-1 font-semibold '><BiMessageDetail className='text-lg' /> 0 </p>
            <p className='flex items-center gap-1 font-semibold '><FaUsersViewfinder className='text-lg' /> 3</p>
          </div>

          <div>
            <p className={`p-[2px] text-xs font-semibold text-white inline bg-red-500 rounded-full cursor-pointer`}>RH</p>
            <p className={`p-[2px] text-xs font-semibold text-white inline bg-teal-500 rounded-full cursor-pointer`}>SV</p>
            <p className={`p-[2px] text-xs font-semibold text-white inline bg-sky-500 rounded-full cursor-pointer`}>AG</p>
          </div>
        </div>
        <div className='mt-4'>
          <p className='bg-purple-400 p-1 px-3 text-white/80 rounded-xl inline'>In Progress</p>
        </div>

        <hr className='border border-gray-300 dark:border-neutral-700 mt-4' />
        <p className='text-neutral-500 px-2 m-1'>No Subtask </p>
        <div className='text-neutral-800 dark:text-gray-200'>
          <p className='flex items-center gap-2 py-2 px-1 bg-neutral-300 dark:bg-neutral-700 rounded-lg'><IoAddOutline /> ADD SUBTASK</p>
        </div>

      </div>
    </>
  )
}

export default TaskList