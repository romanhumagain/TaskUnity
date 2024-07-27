import { useState } from "react";
import { FcMediumPriority } from "react-icons/fc";
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdMore } from "react-icons/io";
import createAxiosInstance from "../../api/axiosInstance";
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import AddTaskModal from "../modal/AddTaskModal";

const Task = ({data, setIsDeleted, setIsUpdated}) => {
  const axiosInstance = createAxiosInstance()
  const [taskId, setTaskId] = useState(null)
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)

  const handleCloseModal = () => {
    setIsAddTaskModalOpen(false);
  };

  const handleDeleteTask = (task_id)=>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#808080",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTask(task_id)
      }
    });
  }

  const deleteTask = async (task_id)=>{
    try {
      const response = await axiosInstance.delete(`tasks/${task_id}/`)
      if(response.status === 200){
        toast.success("Successfully deleted your task !")
        setIsDeleted(true)
      }
    } catch (error) {
      if(error.response){
        toast.error("Sorry, Couldn't delete your task !")
      }
      console.log(error)
    }
  }

  const handleUpdate = (task_id)=>{
    setTaskId(task_id)
    setIsAddTaskModalOpen(true);
  }
  return (
    <>
      <div>
        <div className="bg-gray-200 dark:bg-neutral-800  w-80 p-4 rounded-2xl shadow-xl min-h-64">
          <div className="flex justify-between items-center">
            <p className="font-normal text-gray-700 dark:text-neutral-400 flex items-center gap-1 text-md"><FcMediumPriority />{data.priority.toUpperCase()} PRIORITY</p>
            <IoMdMore className="text-neutral-900 dark:text-gray-200 text-2xl" />
          </div>
          <div className="mt-5">
            <p className="font-semibold text-gray-900 dark:text-neutral-200 text-[18px]">{data.title}</p>
            <p className="text-gray-700 dark:text-neutral-400 text-sm mt-2">{data.description}</p>
            <p className="text-gray-500 dark:text-neutral-500 mt-3 text-[14px]">Due:- {data.due_date}</p>
          </div>
          <div className="mt-4 flex justify-between bottom-0">
            <p className="p-1 bg-teal-600 px-3 inline rounded-2xl font-semibold text-white cursor-pointer transition-transform hover:scale-105 duration-700">Incomplete</p>
            <div className="flex gap-3 items-center">
              <MdEditSquare className="text-neutral-800 dark:text-gray-200 text-2xl cursor-pointer transition-transform hover:scale-110 duration-700"  onClick={()=>handleUpdate(data._id)}/>
              <MdDelete className="text-neutral-800 dark:text-gray-200 text-2xl cursor-pointer transition-transform hover:scale-110 duration-700" onClick={()=>handleDeleteTask(data._id)} />
            </div>
          </div>
        </div>
      </div>
      {isAddTaskModalOpen && (
        <AddTaskModal isOpen={isAddTaskModalOpen} onClose={handleCloseModal} task_id = {taskId} setIsUpdated = {setIsUpdated} />
      )}
    </>
  )
}
export default Task