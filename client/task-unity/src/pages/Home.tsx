import Task from "../components/private/Task"
import { IoMdAddCircleOutline } from "react-icons/io";
const Home = () => {
  return (
    <>
      <div className="min-h-screen w-full bg-gray-100 dark:bg-neutral-900 py-5 px-10">
        <div className="max-w-6xl w-full bg-gray-100 dark:bg-neutral-900 min-h-screen mx-auto shadow-sm p-5 px-10">
          <p className="font-semibold text-2xl p-2 text-gray-800 dark:text-gray-300 mb-5 mt-4">
            All Tasks
          </p>
          <div className="flex gap-10 flex-wrap">

            <Task />
            <Task />

            <div className="bg-gray-200 dark:bg-neutral-800 max-w-xs w-full rounded-2xl flex items-center justify-center shadow-xl">
              <p className="flex items-center gap-2 text-neutral-800 dark:text-gray-200">
                <IoMdAddCircleOutline className="text-3xl" />
                <p className="text-lg ">Add new Task</p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home