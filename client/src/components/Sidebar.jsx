import { useEffect, useState } from "react";
import { CiViewList } from "react-icons/ci";
import { MdOutlineTaskAlt } from "react-icons/md";
import { MdOutlinePending } from "react-icons/md";
import { GoTasklist } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";
import { BsPersonWorkspace } from "react-icons/bs";
import { CgDetailsMore } from "react-icons/cg";
import { RiMenu4Fill } from "react-icons/ri";
import { MdSunny } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { VscPinned } from "react-icons/vsc";
import { GrDocumentMissing } from "react-icons/gr";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { IoMdListBox } from "react-icons/io";
import Swal from 'sweetalert2';
import ProfileModal from "./modal/ProfileModal";
import useAuthUser from "../hooks/useAuthUser";
import CreateWorkspace from "./modal/CreateWorkspace";
import { useWorkspace } from "../context/WorkspaceContext";


const Sidebar = () => {
  const [mode, setMode] = useState(localStorage.getItem("mode") ? localStorage.getItem("mode") : "light")
  const element = document.documentElement
  const location = useLocation()
  const pathname = location.pathname
  const { logoutUser, authUserProfile } = useAuth()
  const [taskMenuOpen, setTaskMenuOpen] = useState(true)
  const [profileModalOpen, setProfileModalOpen] = useState(false)
  const [workspaceModalOpen, setWorkspaceModalOpen] = useState(false)
  const [isSideBarOpen, setIsSideBarOpen] = useState(true)
  const { workspaceData, get_workspace } = useWorkspace();
  const navigate = useNavigate()


  const isActive = (path) => {
    return pathname.split('/').pop() === path
  }

  useEffect(() => {
    switch (mode) {
      case 'dark':
        element.classList.add('dark');
        localStorage.setItem('mode', 'dark');
        break;

      case 'light':
        element.classList.remove('dark')
        localStorage.setItem('mode', 'light')
        break;
    }
  }, [mode])

  const handleMode = () => {
    if (mode === "light") {
      setMode("dark")
    }
    else {
      setMode("light")
    }
  }

  const handleTaskMenu = () => {
    setTaskMenuOpen(!taskMenuOpen)
  }

  const handleCloseModal = () => {
    setProfileModalOpen(false);
    setWorkspaceModalOpen(false)
  };

  const handleLogoutUser = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You have to sign in again to access your account !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#808080",
      confirmButtonText: "Yes, Logout!"
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser()
      }
    });
  }

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen)
  }
  useEffect(()=>{
    get_workspace()
  }, [])
  return (
    <>
      <div className={`text-gray-900 bg-gray-100 dark:text-gray-100 dark:bg-neutral-900 min-h-screen ${isSideBarOpen ? 'w-full' : 'w-[110px]'} py-5 px-2 border-r-2 border-gray-200 dark:border-neutral-600 duration-300 z-50`}>
        <div className={`flex justify-between items-center ${!isSideBarOpen && 'ml-5 '}`}>
          <div className={`px-3 ${isSideBarOpen ? '' : 'hidden'}`}>
            <p className="font-semibold text-lg animate-bounce"><span className=" text-rose-600 text-2xl">T</span>askUnity</p>
          </div>
          <div className="text-2xl px-5 font-bold">
            <RiMenu4Fill onClick={toggleSideBar} className={`${!isSideBarOpen && 'rotate-180'}`} />
          </div>
        </div>
        <div className={`bg-gray-200 text-gray-800 dark:bg-neutral-800 dark:text-gray-200 py-2 px-2  mt-5 rounded-xl cursor-pointer ${isSideBarOpen ? '' : 'mx-4'}`} onClick={() => setProfileModalOpen(true)}>
          <div className="grid grid-cols-12 ">
            <div className={`overflow-hidden  ${isSideBarOpen ? 'col-span-3' : 'col-span-12 mx-auto'}`}>
              <img
                src={authUserProfile.image_url ? authUserProfile?.image_url : 'src/assets/pp.webp'}
                className={`rounded-full ${isSideBarOpen ? 'w-11 h-11' : 'w-8 h-8'}`}
                alt="Profile"
              />
            </div>
            <div className={`col-span-9 ${isSideBarOpen ? '' : 'hidden'}`}>
              <p className="text-md text-gray-900 dark:text-gray-200 font-semibold">{authUserProfile?.full_name}</p>
              <p className="truncate text-sm text-gray-600 dark:text-neutral-400">{authUserProfile?.email}</p>
            </div>
          </div>
        </div>
        <div className="px-5 mt-5 mb-6">
          <Link title="Dashboard" className={`flex items-center gap-1 p-[2px] rounded-md ${isActive('') && 'bg-gray-200 dark:bg-neutral-800'} ${isSideBarOpen ? '' : 'text-xl justify-center'}`} to={"/"}><MdOutlineDashboardCustomize /><p className={`font-semibold text-md text-gray-900 dark:text-neutral-300   hover:bg-gray-200 dark:hover:bg-neutral-800 duration-300 ${isSideBarOpen ? '' : 'hidden'} `}>Dashboard</p></Link>
        </div>
        <hr className="mt-2 mx-5 border border-gray-300 dark:border-neutral-700"></hr>
        <div className="px-5">
          <p className={`font-medium mt-2 text-gray-600 dark:text-neutral-400  ${isSideBarOpen ? 'text-[13px]' : 'text-[8px]'}`}>Private Space</p>
          <div className="mt-4">
            <div className="flex items-center">
              {taskMenuOpen ? (
                <MdKeyboardArrowDown className={`text-xl cursor-pointer ${isSideBarOpen ? '' : 'justify-center'}`} onClick={handleTaskMenu} />
              ) : (
                <MdKeyboardArrowRight className={`text-xl cursor-pointer ${isSideBarOpen ? '' : 'justify-center'}`} onClick={handleTaskMenu} />
              )}
              <Link title="Todo" className={`flex items-center gap-1 p-[2px] text-gray-900 dark:text-white rounded-md ${isActive('task') && 'bg-gray-200 dark:bg-neutral-800'} ${isSideBarOpen ? '' : 'text-xl justify-center text-black'}`} to={"/task"}>
                <IoMdListBox />
                <p className={`font-semibold text-md  hover:bg-gray-200 dark:hover:bg-neutral-800 duration-300 ${isSideBarOpen ? '' : 'hidden'}`}>Todo</p>
              </Link>
            </div>

            <div className={`${!taskMenuOpen && 'hidden'}   ml-5 my-3 `}>
              <Link title="All Task" className={`flex items-center gap-1 text-gray-800 dark:text-neutral-400 p-[2px] mb-2 rounded-md ${isActive('task') && 'bg-gray-200 dark:bg-neutral-800'} ${isSideBarOpen ? '' : 'text-xl justify-center text-gray-800'}`} to={"/task"}>
                <GoTasklist />
                <p className={`text-md  hover:bg-gray-200 dark:hover:bg-neutral-800 duration-300 ${isSideBarOpen ? '' : 'hidden'}`}>All Task</p>
              </Link>

              <Link title="Completed" className={`flex items-center gap-1 text-gray-800 dark:text-neutral-400 p-[2px] mb-2  rounded-md ${isActive('completed-task') && 'bg-gray-200 dark:bg-neutral-800'} ${isSideBarOpen ? '' : 'text-xl justify-center text-gray-700'}`} to={"/completed-task"}>
                <MdOutlineTaskAlt />
                <p className={`text-md  hover:bg-gray-200 dark:hover:bg-neutral-800 duration-300 ${isSideBarOpen ? '' : 'hidden'}`}>Completed</p>
              </Link>

              <Link title="Pending" className={`flex items-center gap-1 p-[2px] text-gray-800 dark:text-neutral-400 mb-2  rounded-md ${isActive('pending-task') && 'bg-gray-200 dark:bg-neutral-800'} ${isSideBarOpen ? '' : 'text-xl justify-center text-gray-700'}`} to={"/pending-task"}>
                <MdOutlinePending />
                <p className={`text-md  hover:bg-gray-200 dark:hover:bg-neutral-800 duration-300 ${isSideBarOpen ? '' : 'hidden'}`}>Pending</p>
              </Link>

              <Link title="Overdue" className={`flex items-center gap-1 p-[2px] text-gray-800 dark:text-neutral-400 mb-2  rounded-md ${isActive('overdue-task') && 'bg-gray-200 dark:bg-neutral-800'} ${isSideBarOpen ? '' : 'text-xl justify-center text-gray-700'}`} to={"/overdue-task"}>
                <GrDocumentMissing className="" />
                <p className={`text-md  hover:bg-gray-200 dark:hover:bg-neutral-800 duration-300 ${isSideBarOpen ? '' : 'hidden'}`}>Overdue</p>
              </Link>

              <Link title="Important" className={`flex items-center gap-1 p-[2px] text-gray-800 dark:text-neutral-400 mb-2  rounded-md ${isActive('important-task') && 'bg-gray-200 dark:bg-neutral-800'} ${isSideBarOpen ? '' : 'text-xl justify-center text-gray-700'}`} to={"/important-task"}>
                <VscPinned className="" />
                <p className={`text-md  hover:bg-gray-200 dark:hover:bg-neutral-800 duration-300 ${isSideBarOpen ? '' : 'hidden'}`}>Important</p>
              </Link>

            </div>
          </div>
        </div>
        <hr className="mt-5 mx-5 border border-gray-300 dark:border-neutral-700"></hr>
        <div className="px-5">
          <p className={`font-medium mt-2 text-gray-600 dark:text-neutral-400 ${isSideBarOpen ? 'text-[13px]' : 'text-[8px]'}`}>Team Space</p>
          <div className="mt-4 flex gap-1 items-center">
            <MdKeyboardArrowDown className={`text-xl cursor-pointer ${isSideBarOpen ? '' : 'justify-center'}`} onClick={handleTaskMenu} />

            <p title="New Workspace" className={`flex items-center gap-1 p-[2px] rounded-md ${isSideBarOpen ? '' : 'text-xl justify-center'}`}>
              <IoMdAdd />
              <span className={`font-semibold text-md text-gray-900 dark:text-neutral-300 hover:bg-gray-200 dark:hover:bg-neutral-800 duration-300 ${isSideBarOpen ? '' : 'hidden'}`} onClick={() => setWorkspaceModalOpen(true)}>New Workspace</span>
            </p>
          </div>
          <div>
            <div className="ml-5 my-3">
              {workspaceData && workspaceData.map((data) => {
                return (
                  <div key={data.id}  className="flex items-center gap-1 font-semibold px-[10px] cursor-pointer mb-2" onClick={()=>navigate(`/workspace/${data._id}`)}>
                  <BsPersonWorkspace />
                    <p title="Workspace1" className={`  rounded-md ${isSideBarOpen ? '' : 'text-xl justify-center'} truncate`}>
                      
                      <span className={`text-md text-gray-800 dark:text-neutral-400 hover:bg-gray-200 dark:hover:bg-neutral-800 duration-300 ${isSideBarOpen ? '' : 'hidden'}`}>{data.name}</span>
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <hr className="mt-8  border border-gray-300 dark:border-neutral-700"></hr>
        <div className="px-5 mt-4">
          <p className={`font-semibold text-md text-gray-900 dark:text-neutral-300 flex items-center gap-1 mt-3 cursor-pointer ${isSideBarOpen ? '' : 'text-xl justify-center'}`} onClick={handleLogoutUser} title="Logout">
            <IoLogOut className={`text-2xl ${!isSideBarOpen && 'ml-1'}`} />
            <span className={`${isSideBarOpen ? '' : 'hidden'}`}>Logout</span>
          </p>


          <label className="inline-flex items-center  cursor-pointer mt-6">
            <input type="checkbox" className="sr-only peer" onChange={handleMode} />
            <div className={`${!isSideBarOpen && 'hidden'} relative w-11 h-5 bg-neutral-700 rounded-full peer dark:bg-gray-300 peer-focus:ring-2 peer-focus:ring-teal-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-300 dark:bg-gray`}></div>
            <span className={`ms-1 text-xs font-medium text-gray-800 dark:text-gray-200 ${!isSideBarOpen && 'px-3'}`}>{mode === 'dark' ? <MdSunny className='text-2xl' /> : <MdDarkMode className=' text-2xl' />}</span>
          </label>
        </div>
      </div>
      {profileModalOpen && (
        <ProfileModal isOpen={profileModalOpen} onClose={handleCloseModal} />
      )}

      {workspaceModalOpen && (
        <CreateWorkspace isOpen={workspaceModalOpen} onClose={handleCloseModal} />
      )}

    </>
  )
}
export default Sidebar