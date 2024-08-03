import { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";
import { useForm } from "react-hook-form";
import { BsPersonWorkspace } from "react-icons/bs";
import createAxiosInstance from "../../api/axiosInstance";
import { useAuth } from "../../context/AuthContext";
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import { useWorkspace } from "../../context/WorkspaceContext";

const CreateWorkspace = ({ isOpen, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const axiosInstance = createAxiosInstance();
  const {logoutUser} = useAuth();
  const navigate = useNavigate()
  const {setIsWorkspaceCreated} = useWorkspace()

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
      name: '',
      description: '',
      priority: 'high',
    }
  })

  const { register, reset, handleSubmit, formState } = form
  const { errors } = formState


  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post('workspace/', data)
      if (response.status === 201) {
        toast.success("Successfully created workspace !")
        setIsWorkspaceCreated(true)
        reset()
        closeModal()
        navigate(`/workspace/${response.data.workspace._id}`)
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
      <div className={`max-w-md w-full p-4 bg-white dark:bg-neutral-800 rounded-xl shadow-lg transform transition-transform duration-300 ${isModalOpen ? "translate-y-0" : "-translate-y-20"}`}>
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
        <div className=" p-8">
          <p className="font-bold text-xl  text-gray-800 dark:text-gray-300 mb-7 mt-1 flex items-center gap-2">
            <BsPersonWorkspace/>Create New Workspace
          </p>
          <div className="">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="font-semibold text-gray-800 dark:text-gray-300" htmlFor="name">Workspace Name</label>
                <input className="block bg-gray-200 dark:bg-neutral-700 p-[10px] dark:text-gray-300  mt-1 focus:outline-none rounded-xl w-full" type="text" id="name"
                  {...register("name", {
                    required: {
                      value: true,
                      message: 'Workspace name is required'
                    }
                  })} />
                <p className='text-red-500 text-left text-[15px] px-1 font-semibold'>{errors.name?.message}</p>
              </div>

              <div className="mb-4">
                <label className="font-semibold text-gray-800 dark:text-gray-300" htmlFor="title">Workspace Description</label>
                <textarea className="block bg-gray-200 dark:bg-neutral-700 p-[6px] dark:text-gray-300 px-2 mt-1 focus:outline-none rounded-xl w-full h-28" id="description"
                  {...register("description", {
                    required: {
                      value: true,
                      message: 'Description is required !'
                    }
                  })} />
                <p className='text-red-500 text-left text-[15px] px-1 font-semibold'>{errors.description?.message}</p>
              </div>

              <div className="grid  grid-cols-12 gap-5 mb-4 ">
                <div className="col-span-6">
                  <label className=" px-1 font-semibold text-gray-800 dark:text-gray-300" htmlFor="title">Select Project Priority</label>
                  <select className="block bg-gray-200 dark:bg-neutral-700 p-[10px] dark:text-gray-300  mt-1 focus:outline-none rounded-xl w-full"
                    {...register("priority", {
                      required: {
                        value: true,
                        message: "Please select task priority ! "
                      }
                    })}>
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end">
                  <button className="flex items-center gap-1 bg-rose-600 p-[8px] px-2 rounded-xl font-semibold text-white hover:bg-rose-700 transition-colors duration-500">
                    <IoMdAdd className="text-xl" />Create Workspace
                  </button>              
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster />

    </div>
  );
};

export default CreateWorkspace;
