import { useEffect } from "react";
import Task from "../../components/private/Task"
import { IoSearch } from "react-icons/io5";
import { useTask } from "../../context/TaskContext";
import { MdOutlineIncompleteCircle } from "react-icons/md";


const PendingTask = () => {
  const { pendingTask, fetchPendingTask } = useTask()

  useEffect(() => {
    fetchPendingTask()
  }, []);

  return (
    <>
      <div className="min-h-screen w-full bg-gray-100 dark:bg-neutral-900 py-5 px-10">
        <div className="max-w-6xl w-full bg-gray-100 dark:bg-neutral-900 min-h-screen mx-auto shadow-sm p-5 px-10">
          {pendingTask?.length > 0 ? (
            <>
              <p className="font-semibold text-3xl p-2 text-gray-800 dark:text-gray-300 mb-5 mt-4 flex items-center gap-2">
                <MdOutlineIncompleteCircle/> Pending Tasks <span className="text-rose-600">({pendingTask?.length})</span>
              </p>
              <div className="flex gap-6 items-center ">
                <div className="  w-1/2">
                  <label className="text-gray-800 dark:text-gray-400" htmlFor="title">Search</label>
                  <div className="relative mt-1">
                    <input
                      className="block bg-gray-200 dark:bg-neutral-700 p-2 pl-10 dark:text-gray-300 focus:outline-none rounded-xl w-full shadow-md"
                      type="text"
                      id="title"
                    />
                    <IoSearch className="absolute left-3 top-1/2  -translate-y-1/2 text-gray-600 dark:text-gray-300" />
                  </div>
                </div>
              </div>
              <div className="flex gap-10 flex-wrap mt-10">
                {pendingTask && pendingTask.map((data) => {
                  return (
                    <div key={data.id}><Task data={data} /></div>
                  )
                })}
              </div>
            </>
          ) : (
            <div class="flex flex-col items-center justify-center mt-10">
              <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-sm relative max-w-lg mx-auto" role="alert">
                <svg class="w-6 h-6 inline-block mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-11a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zM9 9a1 1 0 112 0v2a1 1 0 11-2 0V9z" clip-rule="evenodd" />
                </svg>
                <p class="font-bold">Wohoo! No Pending Tasks</p>
                <p class="text-sm">You have completed all your tasks. Take a break or start a new task!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default PendingTask;