import React from 'react'

import { FaCircleCheck } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
import { IoMdAlert } from "react-icons/io";
import { Link } from 'react-router-dom';

const TaskList = ({ data }) => {
  return (
    <>
      <Link to={`/task-details/${data._id}`}>
        <div className="grid grid-cols-12 items-center mb-2 gap-4 border-b-2 pb-3 border-neutral-200 dark:border-neutral-800 px-2 ">
          <div className="col-span-1">
            {new Date(data.due_date) >= new Date() ? (
              data?.is_completed ? (
                <FaCircleCheck className="text-teal-400 text-xl" />
              ) : (
                <FaRegCircle className="text-teal-400 text-xl" />
              )
            ) : (
              <IoMdAlert className="text-red-600 text-2xl" />
            )}

          </div>
          <div className="col-span-10 ">
            <p className={`truncate font-semibold text-gray-800 dark:text-neutral-300 text-sm ${new Date(data.due_date) < new Date() && 'line-through'}`}>{data?.title}</p>
          </div>
          <div className="col-span-1">
            {data?.is_important ? (
              <IoIosStar className="text-yellow-400 text-xl" />
            ) : (
              <IoIosStarOutline className="text-yellow-400 text-xl" />
            )}
          </div>

        </div>
      </Link>
    </>
  )
}

export default TaskList