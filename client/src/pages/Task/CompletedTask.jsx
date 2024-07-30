import { useEffect } from "react";
import Task from "../../components/private/Task"
import { IoSearch } from "react-icons/io5";
import { useTask } from "../../context/TaskContext";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";


const CompletedTask = () => {
  const { completedTask, fetchCompletedTask } = useTask()

  useEffect(() => {
    fetchCompletedTask()
  }, []);

  return (
    <>
      <div className="min-h-screen w-full bg-gray-100 dark:bg-neutral-900 py-5 px-10">
        <div className="max-w-6xl w-full bg-gray-100 dark:bg-neutral-900 min-h-screen mx-auto shadow-sm p-5 px-10">
          {completedTask?.length > 0 ? (
            <>
              <p className="font-semibold text-3xl p-2 text-gray-800 dark:text-gray-300 mb-5 mt-4 flex items-center gap-2">
                <IoCheckmarkDoneCircleSharp /> Completed Tasks <span className="text-rose-600">({completedTask?.length})</span>
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
                {completedTask && completedTask.map((data) => {
                  return (
                    <div key={data.id}><Task data={data} /></div>
                  )
                })}
              </div>
            </>
          ) :
            (
              <div class="flex flex-col items-center justify-center mt-10">
                <div class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative max-w-lg mx-auto" role="alert">
                  <svg class="w-6 h-6 inline-block mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M8 9a3 3 0 113 3H8V9zM5 8a5 5 0 1010 0A5 5 0 005 8zm3 4a1 1 0 100-2 1 1 0 000 2zm6-1a1 1 0 110-2 1 1 0 010 2z" clip-rule="evenodd" />
                  </svg>
                  <p class="font-bold">No Completed Tasks Yet</p>
                  <p class="text-sm">It looks like you haven't completed any tasks yet. Don't worry, you can start now!</p>
                  <p class="text-sm">Here are some suggestions to get you started:</p>
                  <ul class="list-disc list-inside text-sm mt-2">
                    <li>Prioritize your tasks and tackle the most important ones first</li>
                    <li>Break down large tasks into smaller, manageable steps</li>
                    <li>Set achievable goals and celebrate small wins</li>
                  </ul>
                  <p class="text-sm mt-2">You've got this! 💪</p>
                </div>
              </div>
            )}
        </div>
      </div>
    </>
  )
}

export default CompletedTask