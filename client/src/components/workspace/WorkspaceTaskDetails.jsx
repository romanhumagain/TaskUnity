import { useState, useEffect } from "react";
import { RxActivityLog } from "react-icons/rx";
import { FaTasks } from "react-icons/fa";
import TaskDetails from "./TaskDetails";
import ActivitiesDetails from "./ActivitiesDetails";
import createAxiosInstance from "../../api/axiosInstance";
import { useParams } from "react-router-dom";
import PageNotFound from "../PageNotFound";
import { useWorkspace } from "../../context/WorkspaceContext";

const WorkspaceTaskDetails = () => {
  const [taskDetailsOpen, setTaskDetailsOpen] = useState(true)
  const [activitiesDetailsOpen, setActivitiesDetailsOpen] = useState(false)
  const {fetch_workspace_task_details, taskDetails} = useWorkspace()

  const params = useParams()

  const workspace_id = params.workspace_id
  const task_id = params.task_id

  const axiosInstance = createAxiosInstance()
  const [isAuthorizedUser, setIsAuthorizedUser] = useState(false)

  const verify_workspace = async () => {
    try {
      const response = await axiosInstance.get(`workspace/verify/${workspace_id}/`);
      if (response.status === 200) {
        setIsAuthorizedUser(true)
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setIsAuthorizedUser(false)
        }
      };
      console.log(error)
    }
  };

  const openTaskDetailsComponent = () => {
    setActivitiesDetailsOpen(false)
    setTaskDetailsOpen(true)
  }
  const openActivitiesComponent = () => {
    setTaskDetailsOpen(false)
    setActivitiesDetailsOpen(true)
  }

  useEffect(() => {
    verify_workspace()
    fetch_workspace_task_details(workspace_id, task_id)
  }, [workspace_id, task_id])

  return (
    <>
      {isAuthorizedUser ?
        (
          <div className='min-h-screen w-full bg-gray-100 dark:bg-neutral-900 flex justify-center'>
            <div className='max-w-6xl w-full bg-gray-100 mt-1  dark:bg-neutral-900 px-10 shadow-sm '>
              <div className=''>
                <div className='p-2'>
                  <div className='flex gap-6 items-center mb-5 mt-5 font-semibold'>
                    <p className={`flex items-center gap-2 p-1 px-2 bg-gray-200 dark:bg-neutral-700 shadow-lg  cursor-pointer ${taskDetailsOpen ? 'border-b-2 border-blue-500 text-blue-500' : 'text-neutral-800 dark:text-gray-200'}`} onClick={openTaskDetailsComponent}><FaTasks />Task Details</p>
                    <p className={`flex items-center gap-2 p-1 px-2 bg-gray-200 dark:bg-neutral-700  shadow-lg cursor-pointer ${activitiesDetailsOpen ? 'border-b-2 border-blue-500 text-blue-500' : 'text-neutral-800 dark:text-gray-200'}`} onClick={openActivitiesComponent}><RxActivityLog />Activities</p>
                  </div>
                </div>
                {taskDetailsOpen && taskDetails && (
                  <TaskDetails taskDetails = {taskDetails} workspace_id={workspace_id} />
                )}
                {activitiesDetailsOpen && (
                  <ActivitiesDetails workspace_id={workspace_id} task_id={task_id} />
                )}
              </div>
            </div>
          </div>) :
        (
          <PageNotFound navigateTo={"/"} />
        )}

    </>
  )
}

export default WorkspaceTaskDetails