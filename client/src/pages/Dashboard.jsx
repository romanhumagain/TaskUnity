import { useState } from "react";
import { useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import MyCalendar from "../components/MyCalendar";
import TaskList from "../components/private/TaskList";
import { SiMicrosoftteams } from "react-icons/si";
import { SlCalender } from "react-icons/sl";
import { FaTasks } from "react-icons/fa";
import { useTask } from "../context/TaskContext";
import DashboardCard from "../components/dashboard/DashboardCard";
import ProfileModal from "../components/modal/ProfileModal";
import useAuthUser from "../hooks/useAuthUser";
import { useAuth } from "../context/AuthContext";
import { useWorkspace } from "../context/WorkspaceContext";
import NotificationModal from "../components/modal/NotificationModal";
import WorkspaceList from "../components/private/WorkspaceList";

const Dashboard = () => {
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const [notificationModalOpen, setNotificationModalOpen] = useState(false)

  const user = useAuthUser()
  const {
    allTasks,
    fetchAllTask,
    fetchALlCategoryTask
  } = useTask()

  const { authUserProfile } = useAuth();
  const { workspaceData, get_workspace, get_unread_notification, unreadNotification } = useWorkspace();

  const handleCloseModal = () => {
    setProfileModalOpen(false);
    setNotificationModalOpen(false);
  };


  useEffect(() => {
    get_unread_notification()
    fetchAllTask()
    fetchALlCategoryTask()
    get_workspace()
  }, [])

  return (
    <>
      <div className="min-h-screen w-full bg-gray-50 dark:bg-neutral-900 md:p-5">
        <div className="md:max-w-6xl w-full bg-gray-50 dark:bg-neutral-900 min-h-screen mx-auto shadow-sm p-1 ">
          <div className="text-gray-800 dark:text-neutral-400 ">
            <div className="flex flex-wrap gap-10 justify-between w-full bg-gray-100 dark:bg-neutral-900 p-3 py-4 rounded-2xl shadow-xl">
              <div className="flex items-center gap-8 flex-grow">
                <p className="text-xl text-gray-800 dark:text-neutral-300 font-bold">Dashboard</p>
                <div className="relative w-1/2">
                  <input
                    className="block bg-gray-200 dark:bg-neutral-800 p-2 pl-10 dark:text-gray-300 focus:outline-none rounded-xl w-full shadow-xl"
                    type="text"
                    id="title"
                  />
                  <IoSearch className="absolute left-3 top-1/2  -translate-y-1/2 text-gray-600 dark:text-gray-200" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative inline-flex items-center">
                  <p
                    className="text-3xl cursor-pointer"
                    onClick={() => setNotificationModalOpen(true)}
                  >
                    <IoIosNotifications />
                    {unreadNotification > 0 && (
                      <span className="absolute top-0 right-0  w-4 h-4 text-xs font-medium text-white bg-red-500 rounded-full flex items-center justify-center">
                        {unreadNotification}
                      </span>
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-12 items-center px-3 py-[2px] rounded-lg shadow-lg dark:bg-neutral-800 gap-3 cursor-pointer" onClick={() => setProfileModalOpen(true)}>
                  <div className="overflow-hidden col-span-3">
                    <img
                      src={authUserProfile?.image_url ? authUserProfile?.image_url : 'src/assets/pp.webp'}
                      className="rounded-full w-10 h-10"
                      alt="Profile"
                    />
                  </div>

                  <div className="col-span-9 ">
                    <p className=" text-md font-semibold text-gray-700 dark:text-neutral-300">{authUserProfile?.full_name}</p>
                    <p className="text-sm font-semibold text-gray-600 dark:text-neutral-400">User</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <DashboardCard />
            </div>

            <div className=" w-full p-3 py-4 mt-5 rounded-sm grid md:grid-cols-12 gap-5 ">
              <div className="md:col-span-4 ">
                <p className="font-semibold text-lg flex items-center gap-2 p-1 mb-4"> <SiMicrosoftteams /> Recent Colloborative Project</p>

                <div className="shadow-xl p-2 rounded-xl ">
                  {workspaceData && workspaceData.length > 0 ? workspaceData.map((data) => {
                    return (
                      <div key={data._id}>
                        <WorkspaceList data={data} />
                      </div>
                    )
                  }) : (
                    <p class="text-md font-semibold text-gray-500 dark:text-neutral-400 p-2  rounded shadow-sm">
                      No Workspace Available !
                    </p>
                  )}
                </div>
              </div>
              <div className="md:col-span-4 ">
                <p className="font-semibold text-lg mb-4 p-1 flex items-center gap-2 "><FaTasks /> My Recent Task</p>
                <div className="shadow-xl p-2 rounded-xl ">
                  {allTasks && allTasks.length > 0 ? allTasks.map((data) => {
                    return (
                      <div key={data._id}>
                        <TaskList data={data} />
                      </div>
                    )
                  }) : (

                    <p class="text-md font-semibold text-gray-500 dark:text-neutral-400 p-2  rounded shadow-sm">
                      No Tasks Available !
                    </p>

                  )}
                </div>
              </div>
              <div className="md:col-span-4 px-5 shadow-xl p-2 rounded-xl">
                <p className="font-semibold text-lg flex items-center p-1 gap-2 "> <SlCalender />Calander</p>
                <MyCalendar />
              </div>
            </div>
          </div>
        </div>
      </div>
      {profileModalOpen && (
        <ProfileModal isOpen={profileModalOpen} onClose={handleCloseModal} />
      )}
      {notificationModalOpen && (
        <NotificationModal isOpen={notificationModalOpen} onClose={handleCloseModal} />
      )}
    </>
  )
}
export default Dashboard