import { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { useForm } from "react-hook-form";
import createAxiosInstance from "../../api/axiosInstance";
import toast from 'react-hot-toast';
import { useTask } from "../../context/TaskContext";
import { useAuth } from "../../context/AuthContext";
import { SiFiles } from "react-icons/si";

const WorkspaceAddTaskModal = ({ isOpen, onClose, verifiedMember,workspace_id, task_id = null }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const axiosInstance = createAxiosInstance();
  const { logoutUser } = useAuth();

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const closeModal = () => {
    reset()
    setIsModalOpen(false);
    onClose();
  };

  const form = useForm({
    defaultValues: {
      title: '',
      description: '',
      assigned_users: [],
      due_date: '',
      priority: 'high',
      status: 'todo',
    }
  })

  const fetchTask = async () => {
    try {
      const response = await axiosInstance.get(`tasks/${task_id}`)
      if (response.status === 200) {
        reset({
          title: response.data.title,
          description: response.data.description,
          due_date: response.data.due_date,
          priority: response.data.priority,
          is_important: response.data.is_important,
        });
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          logoutUser()
        }
      }
      console.log(error)
    }
  }

  useEffect(() => {
    if (task_id) {
      fetchTask()
    }
  }, [])

  const { register, reset, handleSubmit, formState } = form
  const { errors } = formState

  const onSubmit = async (data) => {
      try {
        const response = await axiosInstance.post(`workspace/task/${workspace_id}`, data)
        if (response.status === 201) {
          closeModal()
          toast.success("Successfully added task !")
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 401) {
            logoutUser()
            toast.error("Unauthorized")
          }
        }
        console.log(error)
      }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-60 duration-300 ${isModalOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
      <div className={`max-w-lg w-full p-4 bg-white dark:bg-neutral-800 rounded-xl shadow-lg transform transition-transform duration-300 ${isModalOpen ? "translate-y-0" : "-translate-y-20"}`}>
        <button
          type="button"
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={closeModal}>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div className=" p-6">
          <p className="font-bold text-xl  text-gray-800 dark:text-gray-300 mb-5">
            Add New Task
          </p>
          <div className="">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="font-semibold text-gray-800 dark:text-gray-300" htmlFor="title">Task Title</label>
                <input className=" text-md block bg-gray-200 dark:bg-neutral-700 p-[7px] dark:text-gray-300  mt-1 focus:outline-none rounded-xl w-full" type="text" id="title"
                  {...register("title", {
                    required: {
                      value: true,
                      message: 'Title is required'
                    }
                  })} />
                <p className='text-red-500 text-left text-[15px] px-1 font-semibold'>{errors.title?.message}</p>
              </div>

              <div className="mb-4">
                <label className="font-semibold text-gray-800 dark:text-gray-300" htmlFor="description">Task Description</label>
                <textarea className="block bg-gray-200 dark:bg-neutral-700 p-[6px] dark:text-gray-300 px-2 mt-1 focus:outline-none rounded-xl w-full h-16" id="description"
                  {...register("description", {
                    required: {
                      value: true,
                      message: 'Description is required !'
                    }
                  })} />
                <p className='text-red-500 text-left text-[15px] px-1 font-semibold'>{errors.description?.message}</p>
              </div>

              <div className="mb-5">
                <label className="px-1 font-semibold text-gray-800 dark:text-gray-300" htmlFor="assign">
                  Assign Task To
                </label>
                <select
                  id="assign"
                  multiple
                  className="block bg-gray-200 dark:bg-neutral-700 p-2.5 dark:text-gray-300 mt-1 focus:outline-none rounded-xl w-full border border-gray-300 dark:border-gray-600 shadow-sm focus:ring-2 focus:ring-gray-300 dark:focus:ring-neutral-600"
                  {...register("assigned_users", {
                    required: {
                      value: true,
                      message: "Please select at least one person!",
                    },
                  })}
                >
                  {verifiedMember && verifiedMember.map((data) => (
                    <option key={data._id} value={data.user._id} selected={data.role === "admin"}>{data.user.full_name}</option>
                  ))}
                </select>
                <p className='text-red-500 text-left text-[15px] px-1 font-semibold'>{errors.assignedTo?.message}</p>
              </div>


              <div className="grid  grid-cols-12 gap-2 mb-4 mt-5 ">
                <div className="col-span-4">
                  <label className="px-1 font-semibold text-gray-800 dark:text-gray-300" htmlFor="title">Due Date</label>
                  <input className="block bg-gray-200 dark:bg-neutral-700 p-[10px] dark:text-gray-300  mt-1 focus:outline-none rounded-xl w-full" type="date" id="date"
                    {...register("due_date", {
                      required: {
                        value: true,
                        message: 'Due date is required !'
                      }
                    })} />
                  <p className='text-red-500 text-left text-[15px] px-1 font-semibold'>{errors.due_date?.message}</p>

                </div>
                <div className="col-span-4">
                  <label className=" px-1 font-semibold text-gray-800 dark:text-gray-300" htmlFor="title">Select Priority</label>
                  <select className="block bg-gray-200 dark:bg-neutral-700 p-[10px] dark:text-gray-300  mt-1 focus:outline-none rounded-xl w-full"
                    {...register("priority", {
                      required: {
                        value: true,
                        message: "Please select task priority ! "
                      }
                    })}>
                    <option value="high">High </option>
                    <option value="medium">Medium </option>
                    <option value="low">Low </option>
                  </select>
                </div>

                <div className="col-span-4">
                  <label className=" px-1 font-semibold text-gray-800 dark:text-gray-300" htmlFor="title">Task Stage</label>
                  <select className="block bg-gray-200 dark:bg-neutral-700 p-[10px] dark:text-gray-300  mt-1 focus:outline-none rounded-xl w-full"
                    {...register("status", {
                      required: {
                        value: true,
                        message: "Please select task status ! "
                      }
                    })}>
                    <option value="todo">Todo</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <p className='text-red-500 text-left text-[15px] px-1 font-semibold'>{errors.status?.message}</p>
                </div>
              </div>
              <div className="mb-4">
                <button className="p-2 mt-5 rounded-lg text-gray-800 dark:text-gray-200  bg-gray-200 dark:bg-neutral-700 px-3 shadow-lg flex items-center gap-1"><SiFiles className="text-lg" />Add Assets</button>
              </div>
              <div className="flex items-center justify-end">
                <button className="flex items-center gap-2 bg-rose-600 p-[8px] px-8 rounded-xl font-semibold text-white hover:bg-rose-700 transition-colors duration-500">
                  <IoMdAdd className="text-xl" />Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceAddTaskModal;
