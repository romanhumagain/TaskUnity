import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useTask } from '../../context/TaskContext';
import { IoIosStarOutline } from "react-icons/io";
import { IoIosStar } from "react-icons/io";
import { IoMdAlert } from "react-icons/io";



const TaskDetails = () => {
  const params = useParams();
  const task_id = params.id
  const { taskDetails, fetchTaskDetails } = useTask();

  useEffect(() => {
    fetchTaskDetails(task_id)
  }, [])

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-neutral-900 py-5 px-10 flex justify-center ">
      <div className="max-w-xl w-full bg-gray-100 dark:bg-neutral-900 h-full mx-auto shadow-xl p-5 px-10 mt-20">
        <div className='flex justify-between items-center'>
          <p className='font-bold text-black/80 text-xl dark:text-neutral-200'>{taskDetails?.title}</p>
          <p>
            {!taskDetails?.is_important ? (
              <IoIosStarOutline className='text-2xl text-gray-700 dark:text-gray-300' />
            ) : (
              <IoIosStar className='text-2xl text-yellow-500' />
            )}
          </p>
        </div>
        <div className='mt-5 flex gap-5'>
          <p className='p-1 bg-teal-300 inline rounded-lg px-2 text-sm shadow-lg font-semibold'>{taskDetails?.priority.charAt(0).toUpperCase() + taskDetails?.priority.slice(1)} Priority</p>
          {new Date(taskDetails?.due_date) < new Date() ? (
            <p className='p-1 bg-rose-300 rounded-lg px-2 shadow-lg text-sm font-semibold flex items-center gap-1 '><IoMdAlert className='text-red-500 text-xl'/>Missing</p>

          ) : (
            taskDetails?.is_completed ? (
              <p className='p-1 bg-teal-300 inline rounded-lg px-2 shadow-lg text-sm font-semibold '>Completed</p>
            ) : (
              <p className='p-1 bg-purple-300 inline rounded-lg px-2 shadow-lg text-sm font-semibold  '>In Progress</p>
            )
          )}

        </div>
        <div className='mt-3'>
          <p className='text-black/80 dark:text-neutral-200'>{taskDetails?.description}</p>
        </div>
        <div className='mt-5'>
          <p className='text-sm text-gray-500 dark:text-gray-400'>Due Date:- {taskDetails?.due_date.slice(0, 10)}</p>
        </div>
      </div>
    </div>
  )
}

export default TaskDetails