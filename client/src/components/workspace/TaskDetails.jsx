import React, {useState}from 'react'
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { SiFiles } from "react-icons/si";
import { TbSubtask } from "react-icons/tb";
import { FaUsersLine } from "react-icons/fa6";
import pp_img from '../../assets/heroimg.jpg'
import default_pp from '../../assets/pp.webp'
import { SiTicktick } from "react-icons/si";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { format } from 'date-fns';
import Popover from '../Popover';

const TaskDetails = ({ taskDetails, workspace_id }) => {
  const formattedDueDate = taskDetails?.due_date ? format(new Date(taskDetails.due_date), 'MMM d, yyyy') : 'No due date';
  const formattedCreatedDate = taskDetails?.createdAt ? format(new Date(taskDetails.createdAt), 'MMM d, yyyy') : 'No created date';

  const bg_colors = [
    "bg-red-500", "bg-teal-500", "bg-sky-500", "bg-orange-500", "bg-rose-500", "bg-green-500"
  ];

  const [hoveredUser, setHoveredUser] = useState(null);


  return (
    <>
      <div className='bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-neutral-800  dark:to-neutral-900 grid grid-cols-12 h-auto rounded-lg shadow-lg mb-10 pb-5'>
        <div className='col-span-7 p-4 py-2'>
          <div className='text-neutral-800 dark:text-gray-200 mt-2'>
            <p className='text-[22px] flex gap-2 items-center font-semibold'>{taskDetails?.title}</p>
          </div>
          <div className='text-neutral-600 dark:text-neutral-400 mt-3'>
            <p className='text-md'>{taskDetails?.description}</p>
          </div>
          <p className='text-neutral-500 mt-2 text-sm mb-5 '>{formattedDueDate}</p>

          <div className='flex gap-5 items-center'>
            {taskDetails?.priority === 'high' ? (
              <p className='bg-rose-500 text-white/90 p-1 px-3 rounded-2xl inline-flex items-center gap-2 shadow-md dark:shadow-sm shadow-rose-400'><MdKeyboardDoubleArrowUp />High Priority</p>
            ) : (
              taskDetails?.priority === "medium" ? (
                <p className='bg-orange-500 text-white/90 p-1 px-3 rounded-2xl inline-flex items-center gap-2 shadow-md dark:shadow-sm shadow-orange-300'><MdKeyboardArrowUp />Medium Priority</p>
              ) : (
                <p className='bg-green-500 text-white/90 p-1 px-3 rounded-2xl inline-flex items-center gap-2 shadow-md dark:shadow-sm shadow-green-400'><MdKeyboardDoubleArrowUp />Low Priority</p>
              )
            )}

            {taskDetails?.status === 'todo' ? (
              <p className='bg-blue-400 text-white/90 p-1 px-3 rounded-2xl inline-flex items-center gap-2 shadow-md dark:shadow-sm shadow-blue-400'>Todo</p>
            ) : (
              taskDetails?.status === "in_progress" ? (
                <p className='bg-purple-400 text-white/90 p-1 px-3 rounded-2xl inline-flex items-center gap-2 shadow-md dark:shadow-sm shadow-purple-400'>In Progress</p>
              ) : (
                <p className='bg-green-400 text-white/90 p-1 px-3 rounded-2xl inline-flex items-center gap-2 shadow-md dark:shadow-sm shadow-green-400'>Completed</p>

              )
            )}

          </div>
          <div className='p-1 text-neutral-500 mt-4'>
            <p className='text-sm'>Created At:- {formattedCreatedDate}</p>
          </div>
          <hr className='border border-gray-200 dark:border-neutral-800 mt-2 mx-5' />
          <div className='flex items-center gap-5 p-2'>
            <p className='bg-gray-200 dark:bg-neutral-700 dark:text-gray-200 px-2 py-1 rounded-xl shadow-lg flex items-center gap-2'><SiFiles />Assets - 0</p>
            <p className='bg-gray-200 dark:bg-neutral-700 dark:text-gray-200 px-2 py-1 rounded-xl shadow-lg flex items-center gap-2'><TbSubtask />Subtask - 2</p>
            <p className='bg-gray-200 dark:bg-neutral-700 dark:text-gray-200 px-2 py-1 rounded-xl shadow-lg flex items-center gap-2'><FaUsersLine />Team - {taskDetails?.assigned_users?.length}</p>

          </div>
          <hr className='border border-gray-200 dark:border-neutral-800 mt-1 mx-5 ' />
          <div className='mt-4 p-2 bg-gradient-to-r from-gray-200  to-gray-400 dark:from-neutral-800 dark:to-neutral-900 rounded-lg'>
            <p className='font-semibold text-[19px] mb-2 dark:text-gray-200 flex items-center gap-2'>Team Members <FaUsersLine className='text-xl' /></p>
            {taskDetails && taskDetails?.assigned_users.map((data, i) => (
              <div className=' grid-cols-9 mt-2 items-center inline-grid gap-2 py-1' key={data._id}>

                <div className='col-span-1'>
                  <div
                    className="relative"
                  >
                    <p className={`p-[5px] text-xs font-semibold text-white inline ${bg_colors[i]} rounded-full cursor-pointer`}
                      onMouseEnter={() => setHoveredUser(data?.user._id)}
                      onMouseLeave={() => setHoveredUser(null)}
                    >
                      {data?.user.full_name.split(' ')[0].charAt(0)}{data?.user.full_name.split(' ')[1].charAt(0)}
                    </p>
                    {hoveredUser === data?.user._id && (
                      <Popover user_id={data?.user._id} workspace_id={workspace_id} />
                    )}
                  </div>
                </div>
                <div className='col-span-7'>
                  <p className='text-neutral-800 dark:text-gray-200 text-sm font-semibold'>{data.user.full_name}</p>
                  <p className='text-neutral-500 text-[14px]'>{data.user.username}</p>
                </div>
              </div>
            ))}



            <hr className='border border-gray-200 dark:border-neutral-800 mt-1 mx-5' />
          </div>
          <div className='flex justify-end mt-5 mx-5'>
            <button className='py-1 px-4 bg-sky-500 text-white font-semibold rounded-lg hover:scale-105 transition-transform duration-700 flex items-center gap-2'><IoCheckmarkDoneCircleSharp className='text-xl' />Mark Task Completed</button>
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