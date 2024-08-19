import React, { useState } from 'react'
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { IoMdOpen, IoMdPerson, IoMdCreate, IoMdTrash } from 'react-icons/io';
import { IoIosMore } from "react-icons/io";
import { FaCircle } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { BiMessageDetail } from "react-icons/bi";
import { FaUsersViewfinder } from "react-icons/fa6";
import { IoAddOutline } from "react-icons/io5";
import WorkspaceTaskMemberList from './WorkspaceTaskMemberList';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useWorkspace } from '../../context/WorkspaceContext';
import WorkspaceAddTaskModal from '../modal/WorkspaceAddTaskModal';
import AddSubtaskModal from '../modal/AddSubtaskModal'

const TaskList = ({ data, workspace_id, verifiedMember }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdateTaskModalOpen, setIsUpdateTaskModalOpen] = useState(false)
  const [isSubTaskModalOpen, setIsSubTaskModalOpen] = useState(false)



  const { deleteWorkspaceTask } = useWorkspace()

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleDeleteTask = (task_id) => {
    setIsOpen(false)
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
        deleteWorkspaceTask(task_id)
        setIsOpen(false)
      }
    });
  }

  const handleCloseModal = () => {
    setIsOpen(false)
    if (isUpdateTaskModalOpen) {
      setIsUpdateTaskModalOpen(false);
    }
    if (isSubTaskModalOpen) {
      setIsSubTaskModalOpen(false);
    }
  };
  return (
    <>
      <div className="bg-gray-200 dark:bg-neutral-800 max-w-md w-full p-5 px-7 mb-8 rounded-2xl shadow-xl">
        <div className='relative'>
          <div className='flex justify-between items-center'>
            <p className='flex items-center gap-2 text-neutral-800 dark:text-gray-200'>
              {data?.priority === 'high' ? <MdKeyboardDoubleArrowUp /> : <MdKeyboardArrowUp />}
              {data?.priority.toUpperCase()} PRIORITY
            </p>
            <p className='text-xl text-neutral-800 dark:text-gray-200 cursor-pointer' onClick={toggleMenu}>
              <IoIosMore />
            </p>
          </div>

          {isOpen && (
            <div className='absolute  -right-6 mt-2 w-40 z-50 bg-gray-300 dark:bg-neutral-800 border dark:text-gray-200 border-slate-300 dark:border-neutral-600 rounded-lg shadow-lg'>
              <ul className='py-3'>
                <Link to={`/workspace-task-details/${workspace_id}/${data._id}`}>
                  <li className='flex items-center px-4 py-[8px] hover:bg-gray-200 dark:hover:bg-neutral-700 cursor-pointer'>

                    <IoMdOpen className='text-lg mr-2' />
                    Open Task


                  </li> </Link>
                <li className='flex items-center px-4 py-[8px] hover:bg-gray-200 dark:hover:bg-neutral-700 cursor-pointer'>
                  <IoMdPerson className='text-lg mr-2' />
                  Assigned User
                </li>
                <li className='flex items-center px-4 py-[8px] hover:bg-gray-200 dark:hover:bg-neutral-700 cursor-pointer' onClick={()=>setIsUpdateTaskModalOpen(true)}>
                  <IoMdCreate className='text-lg mr-2' />
                  Edit Task
                </li>
                <li className='flex items-center px-4 py-[8px] hover:bg-gray-200 dark:hover:bg-neutral-700 cursor-pointer' onClick={() => handleDeleteTask(data._id)}>
                  <IoMdTrash className='text-lg mr-2' />
                  Delete Task
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className='text-neutral-800 dark:text-gray-200 mt-4'>
          <p className='text-[16px] flex gap-2 items-center font-semibold truncate'><FaCircle className={`${data.priority === 'high' ? 'text-red-600' : (data.priority === 'medium' ? 'text-yellow-500' : 'text-green-500')}`} />{data?.title}</p>
        </div>
        <div className='text-neutral-600 dark:text-neutral-400 mt-3'>
          <p className='text-sm truncate'>{data?.description}</p>
        </div>
        <p className='text-end text-sm text-neutral-500 dark:text-neutral-500'>{format(new Date(data?.due_date), 'MMM d, yyyy')}</p>
        <hr className='border border-gray-300 dark:border-neutral-700 mt-2' />
        <div className='mt-3 flex justify-between' >
          <div className='flex items-center gap-4 text-neutral-600 dark:text-gray-400'>
            <p className='flex items-center gap-1 font-semibold '><FaListUl className='text-sm' /> 2 </p>
            <p className='flex items-center gap-1 font-semibold '><BiMessageDetail className='text-lg' /> 0 </p>
            <p className='flex items-center gap-1 font-semibold '><FaUsersViewfinder className='text-lg' /> {data?.assigned_users.length}</p>
          </div>

          <div>
            <WorkspaceTaskMemberList assigned_users={data?.assigned_users} workspace_id={data.workspace} />
          </div>
        </div>
        <div className='mt-4'>
          {data?.status === "todo" ? (
            <p className='bg-blue-400/90 p-1 px-3 text-white/90 rounded-xl inline'>Todo</p>
          ) : (
            data?.status === "in_progress" ? (
              <p className='bg-purple-400 p-1 px-3 text-white/80 rounded-xl inline'>In Progress</p>
            ) : (
              <p className='bg-green-300 p-1 px-3 text-white/80 rounded-xl inline'>Completed</p>
            )
          )}
        </div>

        <hr className='border border-gray-300 dark:border-neutral-700 mt-4' />
        <div className='text-neutral-800 dark:text-gray-200'>
          <p className='flex items-center gap-2 p-1 bg-gray-300 dark:bg-neutral-700 rounded-lg shadow-md' onClick={()=>setIsSubTaskModalOpen(true)}><IoAddOutline /> ADD SUBTASK</p>
        </div>

      </div>

      {isUpdateTaskModalOpen && (
        <WorkspaceAddTaskModal isOpen={isUpdateTaskModalOpen} onClose={handleCloseModal} verifiedMember={verifiedMember} workspace_id={workspace_id} task_id={data._id} />
      )}
      {isSubTaskModalOpen && (
        <AddSubtaskModal isOpen={isSubTaskModalOpen} onClose={handleCloseModal} task_id={data._id} />
      )}
    </>
  )
}

export default TaskList