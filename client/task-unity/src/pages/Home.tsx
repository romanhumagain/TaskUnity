import { useState } from "react";
import Task from "../components/private/Task"
import { IoSearch } from "react-icons/io5";
import { IoMdAddCircleOutline } from "react-icons/io";
import AddTaskModal from "../components/modal/AddTaskModal";
import { IoMdAdd } from "react-icons/io";


const Home = () => {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)

  const handleAddTaskModal = () => {
    setIsAddTaskModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddTaskModalOpen(false);
  };
  return (
    <>
      <div className="min-h-screen w-full bg-gray-100 dark:bg-neutral-900 py-5 px-10">
        <div className="max-w-6xl w-full bg-gray-100 dark:bg-neutral-900 min-h-screen mx-auto shadow-sm p-5 px-10">
          <p className="font-semibold text-2xl p-2 text-gray-800 dark:text-gray-300 mb-5 mt-4">
            All Tasks
          </p>
          <div className="flex gap-6 items-center ">

            <div className="">
              <label className=" px-1 text-gray-800 dark:text-gray-400" htmlFor="title">Filter by</label>

              <select className="block shadow-sm bg-gray-200 dark:bg-neutral-700 p-[7px] dark:text-gray-300  mt-1 focus:outline-none rounded-xl w-full">
                <option>High Priority</option>
                <option>Medium Priority</option>
                <option>Low Priority</option>
              </select>
            </div>

            <div className="  w-1/2">
              <label className="text-gray-800 dark:text-gray-400" htmlFor="title">Search</label>
              <div className="relative mt-1">
                <input
                  className="block bg-gray-200 dark:bg-neutral-700 p-2 pl-10 dark:text-gray-300 focus:outline-none rounded-xl w-full shadow-md"
                  type="text"
                  id="title"
                />
                <IoSearch className="absolute left-3 top-1/2  -translate-y-1/2 text-gray-600 dark:text-gray-300" />
              </div>

            </div>
            
            <div className="pt-7">
              <button className="shadow-md flex items-center gap-2 bg-rose-600 p-[8px] px-8 rounded-xl font-semibold text-white hover:bg-rose-700 transition-transform hover:scale-105 duration-700" onClick={handleAddTaskModal}>
                <IoMdAdd className="text-xl" />Add Task
              </button>
            </div>
          </div>


          <div className="flex gap-10 flex-wrap mt-10">

            <Task />
            <Task />

            <div className="bg-gray-200 dark:bg-neutral-800 max-w-xs w-full h-64 rounded-2xl flex items-center justify-center shadow-xl cursor-pointer" onClick={handleAddTaskModal}>
              <p className="flex items-center gap-2 text-neutral-800 dark:text-gray-200">
                <IoMdAddCircleOutline className="text-3xl" />
                <p className="text-lg ">Add new Task</p>
              </p>
            </div>
          </div>
        </div>
      </div>
      {isAddTaskModalOpen && (
        <AddTaskModal isOpen={isAddTaskModalOpen} onClose={handleCloseModal} />
      )}
    </>
  )
}

export default Home