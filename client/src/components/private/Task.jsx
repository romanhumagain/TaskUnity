import { useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdMore } from "react-icons/io";
import Swal from 'sweetalert2';
import AddTaskModal from "../modal/AddTaskModal";
import { useTask } from "../../context/TaskContext";
import { FcHighPriority } from "react-icons/fc";
import { FcLowPriority } from "react-icons/fc";
import { FcMediumPriority } from "react-icons/fc";
import { Link } from "react-router-dom";
import { IoIosArrowRoundForward } from "react-icons/io";

const Task = ({ data }) => {
  const [taskId, setTaskId] = useState(null)
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)
  const { deleteTask, handleTaskCompletion } = useTask()

  const handleCloseModal = () => {
    setIsAddTaskModalOpen(false);
  };

  const handleDeleteTask = (task_id) => {
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

  const handleUpdate = (task_id) => {
    setTaskId(task_id)
    setIsAddTaskModalOpen(true);
  }
  const dueDateStr = data.due_date;
  const dueDateObj = new Date(dueDateStr);

  const options = { month: 'long', day: 'numeric' };
  const formattedDueDate = dueDateObj.toLocaleDateString('en-US', options);
  
  const truncateTitle = (title)=>{
    if(title.length >= 60){
      return title.slice(0,60) + '....'
    }
    return title
  }

  const truncateDescription = (description)=>{
    if(description.length >= 200){
      return description.slice(0,200) + '....'
    }
    return description
  }
  return (
    <>
      <div>
        <div className="bg-gray-200 dark:bg-neutral-800  w-80 p-4 rounded-2xl shadow-xl min-h-64">
          <div className="flex justify-between items-center">
            <p className="font-normal text-gray-700 dark:text-neutral-400 flex items-center gap-1 text-md">
              {data.priority === "high" ? (<FcHighPriority />) : data.priority === "medium" ? (<FcMediumPriority />) : data.priority === "low" ? (<FcLowPriority />) : null}
              {data.priority.toUpperCase()} PRIORITY</p>
            <IoMdMore className="text-neutral-900 dark:text-gray-200 text-2xl" />
          </div>
          <div className="mt-5 overflow-hidden">
            <p className="font-semibold text-gray-900 dark:text-neutral-200 text-[18px]">{truncateTitle(data.title)}</p>
            <p className="text-gray-700 dark:text-neutral-400 text-sm mt-2">{truncateDescription(data.description)}</p>
            <div className="flex justify-between items-center mt-3">
              <p className="text-gray-500 dark:text-neutral-400  text-[14px]">Due:- {formattedDueDate}</p>
              <Link to={`/task-details/${data._id}`}> <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">Read More <IoIosArrowRoundForward className="text-2xl" /></p></Link>
            </div>
          </div>
          <div className="mt-4 flex justify-between bottom-0">
            {data.is_completed ? (
              <button className="p-1 bg-teal-600 px-3 inline rounded-2xl font-semibold text-white cursor-pointer transition-transform hover:scale-105 duration-700" onClick={() => handleTaskCompletion("incomplete", data._id)}>Completed</button>
            ) : (
              <button className={`p-1 bg-rose-600 px-3 inline rounded-2xl font-semibold text-white cursor-pointer transition-transform hover:scale-105 duration-700 ${new Date(data.due_date) < new Date() && 'line-through hover:scale-100'} `} disabled={new Date(data.due_date) < new Date()} onClick={() => handleTaskCompletion("completed", data._id)}>Incomplete</button>
            )}
            <div className="flex gap-3 items-center">
              {new Date(data.due_date) >= new Date() && (
                <MdEditSquare className="text-neutral-800 dark:text-gray-200 text-2xl cursor-pointer transition-transform hover:scale-110 duration-700" onClick={() => handleUpdate(data._id)} />
              )}
              <MdDelete className="text-neutral-800 dark:text-gray-200 text-2xl cursor-pointer transition-transform hover:scale-110 duration-700" onClick={() => handleDeleteTask(data._id)} />
            </div>
          </div>
        </div>
      </div>
      {isAddTaskModalOpen && (
        <AddTaskModal isOpen={isAddTaskModalOpen} onClose={handleCloseModal} task_id={taskId} />
      )}
    </>
  )
}
export default Task