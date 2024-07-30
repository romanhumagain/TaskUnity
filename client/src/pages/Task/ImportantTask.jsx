import { useEffect } from "react";
import Task from "../../components/private/Task"
import { useTask } from "../../context/TaskContext";
import { FaStar } from "react-icons/fa";

const ImportantTask = () => {
  const { importantTask, fetchImportantTask } = useTask()

  useEffect(() => {
    fetchImportantTask()
  }, []);

  return (
    <>
      <div className="min-h-screen w-full bg-gray-100 dark:bg-neutral-900 py-5 px-10">
        <div className="max-w-6xl w-full bg-gray-100 dark:bg-neutral-900 min-h-screen mx-auto shadow-sm p-5 px-10">
          {importantTask?.length > 0 ? (
            <>
              <p className="font-semibold text-3xl p-2 text-gray-800 dark:text-gray-300 mb-5 mt-4 flex items-center gap-2">
                <FaStar/>Important Tasks <span className="text-rose-600">({importantTask?.length})</span>
              </p>

              <div className="flex gap-10 flex-wrap mt-10">
                {importantTask && importantTask.map((data) => {
                  return (
                    <div key={data.id}><Task data={data} /></div>
                  )
                })}
              </div>
            </>
          ) :
            (
              <div class="flex flex-col items-center justify-center mt-10">
                <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-lg relative max-w-lg mx-auto text-center" role="alert">
                  
                  <p class="font-semibold text-xl mb-1">🎉 Fantastic!</p>
                  <p class="text-sm">You’ve got no important tasks right now. Enjoy the moment!</p>
                </div>
              </div>

            )}
        </div>
      </div>
    </>
  )
}

export default ImportantTask