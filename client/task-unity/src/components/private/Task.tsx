import { FcMediumPriority } from "react-icons/fc";
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdMore } from "react-icons/io";

const Task = () => {
  return (
    <>
      <div>
        <div className="bg-gray-200 dark:bg-neutral-800 max-w-xs w-full p-4 rounded-2xl shadow-xl">
          <div className="flex justify-between items-center">
            <p className="font-normal text-gray-700 dark:text-neutral-400 flex items-center gap-1 text-md"><FcMediumPriority />Medium Priority</p>
            <IoMdMore className="text-neutral-900 dark:text-gray-200 text-2xl" />
          </div>

          <div className="mt-5">
            <p className="font-semibold text-gray-900 dark:text-neutral-200 text-[18px]">Learning MERN stack</p>
            <p className="text-gray-700 dark:text-neutral-400 text-sm mt-2">Learning Backend from the youtube tutorial. Especially focusing on Node and Express with Mongo DB</p>
            <p className="text-gray-500 dark:text-neutral-500 mt-3">29/03/2003</p>
          </div>
          <div className="mt-4 flex justify-between">
            <p className="bg-rose-600 p-1 px-3 inline rounded-2xl font-semibold text-white cursor-pointer">Incomplete</p>
            <div className="flex gap-3 items-center">
              <MdEditSquare className="text-neutral-800 dark:text-gray-200 text-2xl cursor-pointer" />
              <MdDelete className="text-neutral-800 dark:text-gray-200 text-2xl cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Task