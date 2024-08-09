import { RxActivityLog } from "react-icons/rx";
import { FaTasks } from "react-icons/fa";
import TaskDetails from "./TaskDetails";
import { useState } from "react";
import ActivitiesDetails from "./ActivitiesDetails";

const WorkspaceTaskDetails = () => {
  const [taskDetailsOpen, setTaskDetailsOpen] = useState(true)
  const [activitiesDetailsOpen, setActivitiesDetailsOpen] = useState(false)

  const openTaskDetailsComponent = ()=>{
    setActivitiesDetailsOpen(false)
    setTaskDetailsOpen(true)
  }
  const openActivitiesComponent = ()=>{
    setTaskDetailsOpen(false)
    setActivitiesDetailsOpen(true)
  }
  return (
    <>
      <div className='min-h-screen w-full bg-gray-100 dark:bg-neutral-900 flex justify-center'>
        <div className='max-w-6xl w-full bg-gray-100 mt-1  dark:bg-neutral-900 px-10 shadow-sm '>
          <div className=''>
            <div className='p-2'>
              <div className='flex gap-6 items-center mb-5 mt-5 font-semibold'>
                <p className={`flex items-center gap-2 p-1 px-2 bg-gray-200 dark:bg-neutral-700 shadow-lg  cursor-pointer ${taskDetailsOpen ? 'border-b-2 border-blue-500 text-blue-500':'text-neutral-800 dark:text-gray-200'}`} onClick={openTaskDetailsComponent}><FaTasks />Task Details</p>
                <p className={`flex items-center gap-2 p-1 px-2 bg-gray-200 dark:bg-neutral-700  shadow-lg cursor-pointer ${activitiesDetailsOpen ? 'border-b-2 border-blue-500 text-blue-500':'text-neutral-800 dark:text-gray-200'}`} onClick={openActivitiesComponent}><RxActivityLog />Activities</p>
              </div>
            </div>
            {taskDetailsOpen &&(
              <TaskDetails />
            )}
            {activitiesDetailsOpen && (
              <ActivitiesDetails/>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default WorkspaceTaskDetails