import React from 'react'
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { SiFiles } from "react-icons/si";
import { TbSubtask } from "react-icons/tb";
import { FaUsersLine } from "react-icons/fa6";
import pp_img from '../../assets/heroimg.jpg'
import default_pp from '../../assets/pp.webp'
import { SiTicktick } from "react-icons/si";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";

const TaskDetails = () => {
  return (
    <>
      <div className='bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-neutral-800  dark:to-neutral-900 grid grid-cols-12 h-auto rounded-lg shadow-lg mb-10 pb-5'>
        <div className='col-span-7 p-4 py-2'>
          <div className='text-neutral-800 dark:text-gray-200 mt-2'>
            <p className='text-[22px] flex gap-2 items-center font-semibold'>Adding Authentication and Authorization</p>
          </div>
          <div className='text-neutral-600 dark:text-neutral-400 mt-3'>
            <p className='text-md'>Lorem ipsum dolor sit ame bus voluptates reiciendis quaerat illo.</p>
          </div>
          <p className='text-neutral-500 mt-2 text-sm mb-5 '>Due:- 29 Jan-2024</p>

          <div className='flex gap-5 items-center'>
            <p className='bg-rose-500 text-white/90 p-1 px-3 rounded-2xl inline-flex items-center gap-2 shadow-md dark:shadow-sm shadow-rose-400'><MdKeyboardDoubleArrowUp />High Priority</p>
            <p className='bg-purple-500 text-white/90 p-1 px-3 rounded-2xl inline-flex items-center gap-2 shadow-md dark:shadow-sm shadow-purple-400'>In Progress</p>
          </div>
          <div className='p-1 text-neutral-500 mt-4'>
            <p className='text-sm'>Created At:- Fri 29 Jan</p>
          </div>
          <hr className='border border-gray-200 dark:border-neutral-800 mt-2 mx-5' />
          <div className='flex items-center gap-5 p-2'>
            <p className='bg-gray-200 dark:bg-neutral-700 dark:text-gray-200 px-2 py-1 rounded-xl shadow-lg flex items-center gap-2'><SiFiles />Assets - 0</p>
            <p className='bg-gray-200 dark:bg-neutral-700 dark:text-gray-200 px-2 py-1 rounded-xl shadow-lg flex items-center gap-2'><TbSubtask />Subtask - 2</p>
            <p className='bg-gray-200 dark:bg-neutral-700 dark:text-gray-200 px-2 py-1 rounded-xl shadow-lg flex items-center gap-2'><FaUsersLine />Team - 4</p>

          </div>
          <hr className='border border-gray-200 dark:border-neutral-800 mt-1 mx-5 ' />
          <div className='mt-4 p-2 bg-gradient-to-r from-gray-200  to-gray-400 dark:from-neutral-800 dark:to-neutral-900 rounded-lg'>
            <p className='font-semibold text-[19px] mb-2 dark:text-gray-200 flex items-center gap-2'>Team Members <FaUsersLine className='text-xl' /></p>
            <div className=' grid-cols-9 mt-2 items-center inline-grid gap-2 py-1'>
              <div className='col-span-1'>
                <img src={pp_img} className='h-8 w-8 rounded-full'></img>
              </div>
              <div className='col-span-7'>
                <p className='text-neutral-800 dark:text-gray-200 text-sm font-semibold'>Roman Humagain</p>
                <p className='text-neutral-500 text-[14px]'>roman__</p>
              </div>
            </div>

            <div className=' grid-cols-9  items-center  inline-grid gap-2 py-1'>
              <div className='col-span-1'>
                <img src={default_pp} className='h-8 w-8 rounded-full'></img>
              </div>
              <div className='col-span-7'>
                <p className='text-neutral-800 dark:text-gray-200 text-sm font-semibold'>Anuj Gautam</p>
                <p className='text-neutral-500 text-[14px]'>anuj_gtm</p>
              </div>
            </div>

            <div className=' grid-cols-9  items-center  inline-grid gap-2 py-1'>
              <div className='col-span-1'>
                <img src={default_pp} className='h-8 w-8 rounded-full'></img>
              </div>
              <div className='col-span-7'>
                <p className='text-neutral-800 dark:text-gray-200 text-sm font-semibold'>Suryanshu Verma</p>
                <p className='text-neutral-500 text-[14px]'>surya_123</p>
              </div>
            </div>
            <hr className='border border-gray-200 dark:border-neutral-800 mt-1 mx-5' />
          </div>
          <div className='flex justify-end mt-5 mx-5'>
              <button className='py-1 px-4 bg-sky-500 text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-700 flex items-center gap-2'><IoCheckmarkDoneCircleSharp className='text-xl'/>Mark Task Completed</button>
            </div>
        </div>

        <div className='col-span-5'>
          {/* <p className='font-semibold text-gray-800 dark:text-gray-200 text-lg mt-5'>Assets</p>
          <p className='text-neutral-500 text-lg mt-2'>No Assets Found !</p> */}
          <div>
              <p className='font-semibold text-[19px] mb-2 dark:text-gray-200 flex items-center gap-2 mt-4'>Sub-Tasks <TbSubtask className='text-xl' /></p>

              <div className='flex items-center gap-3 mt-3 mb-4'>
                <div className='text-2xl text-purple-500'>
                  <SiTicktick />
                </div>
                <div>
                  <div className='flex items-center gap-2'>
                    <p className='text-neutral-500 text-sm'>Thu Feb 09 2024</p>
                    <p className='px-2  text-sm bg-purple-300 text-gray-700 rounded-lg shadow-lg'>Design</p>
                  </div>
                  <div>
                    <p className='text-gray-600 dark:text-neutral-300 text-[15px] font-semibold'>Design Login and Registration Page</p>
                  </div>

                </div>
              </div>

              <div className='flex items-center gap-3 mt-2 mb-4'>
                <div className='text-2xl text-red-500'>
                  <SiTicktick />
                </div>
                <div>
                  <div className='flex items-center gap-2'>
                    <p className='text-neutral-500 text-sm'>Thu Feb 09 2024</p>
                    <p className='px-2  text-sm bg-red-300 text-gray-700 rounded-lg shadow-lg'>Bug</p>
                  </div>
                  <div>
                    <p className='text-gray-600 dark:text-neutral-300 text-[15px] font-semibold'>Fix JWT Token Authentication</p>
                  </div>

                </div>
              </div>

              <div className='flex items-center gap-3 mt-2'>
                <div className='text-2xl text-teal-500'>
                  <SiTicktick />
                </div>
                <div>
                  <div className='flex items-center gap-2'>
                    <p className='text-neutral-500 text-sm'>Thu Feb 09 2024</p>
                    <p className='px-2  text-sm bg-teal-300 text-gray-700 rounded-lg shadow-lg'>Code</p>
                  </div>
                  <div>
                    <p className='text-gray-600 dark:text-neutral-300 text-[15px] font-medium'>Implement Login and Registration Process</p>
                  </div>

                </div>
              </div>
            </div>
        </div>

      </div>
    </>
  )
}

export default TaskDetails