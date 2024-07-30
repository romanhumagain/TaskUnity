import { useEffect } from "react";
import Task from "../../components/private/Task"
import { useTask } from "../../context/TaskContext";
import { GrDocumentMissing } from "react-icons/gr";

const OverdueTask = () => {
  const { overdueTask, fetchOverdueTask } = useTask()

  useEffect(() => {
    fetchOverdueTask()
  }, []);

  return (
    <>
      <div className="min-h-screen w-full bg-gray-100 dark:bg-neutral-900 py-5 px-10">
        <div className="max-w-6xl w-full bg-gray-100 dark:bg-neutral-900 min-h-screen mx-auto shadow-sm p-5 px-10">
          {overdueTask?.length > 0 ? (
            <>
              <p className="font-semibold text-3xl p-2 text-gray-800 dark:text-gray-300 mb-5 mt-4 flex items-center gap-2">
                <GrDocumentMissing/>Overdue Tasks <span className="text-rose-600">({overdueTask?.length})</span>
              </p>

              <div className="flex gap-10 flex-wrap mt-10">
                {overdueTask && overdueTask.map((data) => {
                  return (
                    <div key={data.id}><Task data={data} /></div>
                  )
                })}
              </div>
            </>
          ) :
            (
              <div class="flex flex-col items-center justify-center mt-10">
                <div class="bg-teal-100 border border-teal-400 text-teal-700 px-4 py-3 rounded relative max-w-lg mx-auto" role="alert">
                  <svg class="w-6 h-6 inline-block mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-11a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zM9 9a1 1 0 112 0v2a1 1 0 11-2 0V9z" clip-rule="evenodd" />
                  </svg>
                  <p class="font-bold">Wohoo! No Overdue Tasks</p>
                  <p class="text-sm">Everything's on track! Keep up the awesome work.</p>
                </div>
              </div>
            )}
        </div>
      </div>
    </>
  )
}

export default OverdueTask