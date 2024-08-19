import React, { useState } from 'react';
import createAxiosInstance from "../../api/axiosInstance";
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { FaUserCircle, FaTimes, FaUsers } from "react-icons/fa";
import loadingGif from '../../assets/loading.gif'
import { useWorkspace } from '../../context/WorkspaceContext';
import { useForm } from "react-hook-form";
import { useAuth } from '../../context/AuthContext';


const AddSubtaskModal = ({ isOpen, onClose, task_id }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const axiosInstance = createAxiosInstance();
  const { logoutUser } = useAuth();

  const closeModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  const form = useForm();
  const { register, reset, handleSubmit, formState } = form
  const { errors } = formState

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post(`workspace/task/subtask/${task_id}`, data)
      if (response.status === 200) {
        closeModal()
        toast.success("Successfully added subtask !")

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
  }

  return (
    <>

      <div className={`fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-60 transition-opacity ${isModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className={`relative max-w-md w-full p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-lg transform transition-transform duration-300 ${isModalOpen ? 'translate-y-0' : '-translate-y-20'}`}>
          <button
            type="button"
            className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={closeModal}
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white text-center mb-4">Add Subtask</h2>
          <p className="text-gray-600 dark:text-gray-300 text-center mb-4 text-sm">
            Enter the details of the subtask you want to add. Provide a clear and concise description to help with task management.
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="relative mb-2">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4z" />
                  <path d="M7 7h6M7 10h6M7 13h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

              </div>
              <input
                type="text"
                id="email-address-icon"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 dark:bg-neutral-700 dark:border-neutral-500 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                placeholder="Subtask Description"
                {...register("description", {
                  required: {
                    value: true,
                    message: 'Description is required'
                  }
                })}
              />

            </div>
            <p className='text-red-500 text-left text-[14px] px-1 font-semibold mb-4'>{errors.description?.message}</p>



            <div className="relative mb-2">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13.293 4.707a1 1 0 0 1 1.414 0l2.586 2.586a1 1 0 0 1 0 1.414l-7 7a1 1 0 0 1-.707.293H4a1 1 0 0 1-1-1V8.414a1 1 0 0 1 .293-.707l7-7zM12 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
                </svg>
              </div>
              <input
                type="text"
                id="email-address-icon"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 dark:bg-neutral-700 dark:border-neutral-500 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                placeholder="Subtask Tag"
                {...register("tag", {
                  required: {
                    value: true,
                    message: 'Tag is required'
                  }
                })}
              />
            </div>
            <p className='text-red-500 text-left text-[14px] px-1 font-semibold'>{errors.tag?.message}</p>


            <div className='flex justify-center'>
              <button
                type="submit"
                className="mt-5 bg-sky-500 text-white px-4 py-1 rounded-xl hover:bg-sky-600 transition duration-300"

              >
                Add Subtask
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default AddSubtaskModal;
