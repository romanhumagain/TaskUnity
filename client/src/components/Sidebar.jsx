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
import { GrDocumentMissing } from "react-icons/gr";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const [mode, setMode] = useState("dark")
  const element = document.documentElement
  const location = useLocation()
  const pathname = location.pathname
  const {logoutUser} = useAuth()

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

  return (
    <>
      <div className="text-gray-900 bg-gray-100 dark:text-gray-100 dark:bg-neutral-900 min-h-screen w-full py-5 px-2 border-r-2 border-gray-200 dark:border-neutral-600">
        <div className="flex justify-between items-center">
          <div className="px-3">
            <p className="font-semibold text-lg animate-bounce"><span className=" text-rose-600 text-2xl">T</span>askUnity</p>
          </div>
          <div className="text-2xl px-5">
            <RiMenu4Fill />
          </div>
        </div>
        <div className="bg-gray-200 text-gray-800 dark:bg-neutral-800 dark:text-gray-200 py-3 px-2 mt-5 rounded-xl">
          <div className="grid grid-cols-12 ">
            <div className="overflow-hidden col-span-3">
              <img src="src\assets\heroimg.jpg" className="rounded-full w-11 h-11"></img>
            </div>
            <div className="col-span-9">
              <p className="text-md text-gray-900 dark:text-gray-200">Roman Humagain</p>
              <p className="truncate text-sm text-gray-600 dark:text-neutral-400">romanhumagain@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="px-5 mt-5 mb-6">
          <Link to={"/"}><p className={`font-semibold text-md text-gray-900 dark:text-neutral-300 flex items-center gap-1 p-[2px] rounded-md hover:bg-gray-200 dark:hover:bg-neutral-800 duration-300 ${isActive('') && 'bg-gray-200 dark:bg-neutral-800'}`}><MdOutlineDashboardCustomize />Dashboard</p></Link>
        </div>
        <hr className="mt-2 mx-5 border border-gray-300 dark:border-neutral-700"></hr>
        <div className="px-5">
          <p className="font-medium mt-2 text-gray-600 dark:text-neutral-400 text-[13px]">Private Space</p>
          <div className="mt-4">
            <Link to={"/task"}><p className="font-semibold text-md text-gray-900 dark:text-neutral-300 flex items-center gap-1 p-[2px] rounded-md hover:bg-gray-200 dark:hover:bg-neutral-800 duration-300"><CiViewList />Todo</p></Link>
            <div className="ml-3 my-3">
              <Link to={"/task"}><p className={`text-md text-gray-800 dark:text-neutral-400 mb-2 flex items-center gap-1 p-[2px] rounded-md hover:bg-gray-200 dark:hover:bg-neutral-800 duration-300 ${isActive('task') && 'bg-gray-200 dark:bg-neutral-800'}`}><GoTasklist />All Task</p></Link>
              <Link to={""}><p className={`text-md text-gray-800 dark:text-neutral-400 mb-2 flex items-center gap-1 p-[2px] rounded-md hover:bg-gray-200 dark:hover:bg-neutral-800 duration-300 ${isActive('completed') && 'bg-gray-200 dark:bg-neutral-800'}`}><MdOutlineTaskAlt />Completed</p></Link>
              <Link to={""}><p className={`text-md text-gray-800 dark:text-neutral-400 mb-2 flex items-center gap-1 p-[2px] rounded-md hover:bg-gray-200 dark:hover:bg-neutral-800 duration-300 ${isActive('pending') && 'bg-gray-200 dark:bg-neutral-800'}`}><MdOutlinePending />Pending</p></Link>
              <Link to={""}><p className={`text-md text-gray-800 dark:text-neutral-400 mb-2 flex items-center gap-1 p-[2px] rounded-md hover:bg-gray-200 dark:hover:bg-neutral-800 duration-300 ${isActive('overdue') && 'bg-gray-200 dark:bg-neutral-800'}`}><GrDocumentMissing className="text-sm" />Overdue</p></Link>
            </div>
          </div>
        </div>
        <hr className="mt-8 mx-5 border border-gray-300 dark:border-neutral-700"></hr>
        <div className="px-5">
          <p className="font-medium mt-2 text-gray-600 dark:text-neutral-400 text-[13px]">Team Space</p>
          <div className="mt-4">
            <p className="font-semibold text-md text-gray-900 dark:text-neutral-300 flex items-center gap-1"><IoMdAdd />New Workspace</p>
          </div>
          <div>
            <div className="ml-3 my-3">
              <p className="text-md text-gray-800 dark:text-neutral-400 mb-2 flex items-center gap-1"><BsPersonWorkspace />Workspace1</p>
              <p className="text-md text-gray-800 dark:text-neutral-400 mb-2 flex items-center gap-1"><BsPersonWorkspace />Workspace2</p>
            </div>
          </div>
        </div>
        <hr className="mt-8 mx-5 border border-gray-300 dark:border-neutral-700"></hr>
        <div className="px-5 mt-4">
          <p className="font-semibold text-md text-gray-900 dark:text-neutral-300 flex items-center gap-1"><CgDetailsMore />More</p>
          <p className="font-semibold text-md text-gray-900 dark:text-neutral-300 flex items-center gap-1 mt-3" onClick={logoutUser}><CgDetailsMore />Logout</p>


          <label className="inline-flex items-center me-3 cursor-pointer mt-4">
            <input type="checkbox" className="sr-only peer" onChange={handleMode} />
            <div className="relative w-11 h-5 bg-neutral-700 rounded-full peer dark:bg-gray-300 peer-focus:ring-2 peer-focus:ring-teal-400 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-300 dark:bg-gray"></div>
            <span className="ms-1 text-xs font-medium text-gray-800 dark:text-gray-200">{mode === 'dark' ? <MdSunny className='text-2xl' /> : <MdDarkMode className=' text-2xl' />}</span>
          </label>
        </div>
      </div>
    </>
  )
}
export default Sidebar