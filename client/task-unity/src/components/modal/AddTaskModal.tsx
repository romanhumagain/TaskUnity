import { useState, useEffect } from "react";
import { IoMdAdd } from "react-icons/io";


type AddTaskModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AddTaskModal = ({ isOpen, onClose }: AddTaskModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-60 duration-300 ${isModalOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
    >
      <div
        className={`max-w-lg w-full p-4 bg-white dark:bg-neutral-800 rounded-xl shadow-lg transform transition-transform duration-300 ${isModalOpen ? "translate-y-0" : "-translate-y-20"
          }`}
      >
        <button
          type="button"
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={closeModal}
        >
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
          <p className="font-bold text-xl  text-gray-800 dark:text-gray-300 mb-7 mt-1">
            Add Task
          </p>
          <div className="">
            <form>
              <div className="mb-4">
                <label className="font-semibold text-gray-800 dark:text-gray-300" htmlFor="title">Task Title</label>
                <input className="block bg-gray-200 dark:bg-neutral-700 p-[10px] dark:text-gray-300  mt-1 focus:outline-none rounded-xl w-full" type="text" id="title" />
              </div>

              <div className="mb-4">
                <label className="font-semibold text-gray-800 dark:text-gray-300" htmlFor="title">Task Description</label>
                <textarea className="block bg-gray-200 dark:bg-neutral-700 p-[6px] dark:text-gray-300 px-2 mt-1 focus:outline-none rounded-xl w-full h-28" id="title" />
              </div>

              <div className="grid  grid-cols-12 gap-5 mb-4 ">
                <div className="col-span-6">
                  <label className="px-1 font-semibold text-gray-800 dark:text-gray-300" htmlFor="title">Due Date</label>
                  <input className="block bg-gray-200 dark:bg-neutral-700 p-[10px] dark:text-gray-300  mt-1 focus:outline-none rounded-xl w-full" type="date" id="title" />
                </div>
                <div className="col-span-6">
                  <label className=" px-1 font-semibold text-gray-800 dark:text-gray-300" htmlFor="title">Select Priority</label>

                  <select className="block bg-gray-200 dark:bg-neutral-700 p-[10px] dark:text-gray-300  mt-1 focus:outline-none rounded-xl w-full">
                    <option>High Priority</option>
                    <option>Low Priority</option>
                    <option>Medium Priority</option>
                  </select>
                </div>

              </div>
              <div className="mb-4">
                <div className="flex items-center mb-5">
                  <input id="isImportant" type="checkbox" value="" className="w-4 h-4 bg-gray-100 border-gray-300 rounded" />
                  <label htmlFor="isImportant" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Is Important</label>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <button className="flex items-center gap-2 bg-rose-600 p-[8px] px-8 rounded-xl font-semibold text-white hover:bg-rose-700 transition-colors duration-500">
                  <IoMdAdd className="text-xl"/>Add Task
                </button>
              </div>


            </form>

          </div>

        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
