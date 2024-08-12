import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useWorkspace } from '../../context/WorkspaceContext';
import ActivityMessage from './ActivityMessage';

const ActivitiesDetails = ({ workspace_id, task_id }) => {
  const { send_task_activity, fetch_workspace_task_activities, taskActivities, isTaskActivitySent, setIsTaskActivitySent } = useWorkspace();

  const form = useForm({
    defaultValues: {
      activity: '',
      message: '',
    }
  });

  const { formState, register, reset, handleSubmit } = form;
  const { errors } = formState;

  const sendMessage = async (data) => {
    send_task_activity(data, workspace_id, task_id)
    reset()
    console.log("message sent successfully !")
  };

  useEffect(() => {
    fetch_workspace_task_activities(workspace_id, task_id)
  }, [workspace_id, task_id])

  useEffect(() => {
    if (isTaskActivitySent) {
      fetch_workspace_task_activities(workspace_id, task_id)
      setIsTaskActivitySent(false)
    }
  }, [isTaskActivitySent])

  return (
    <>
      <div className='bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-neutral-800 dark:via-neutral-900 dark:to-neutral-800  h-auto rounded-lg shadow-lg '>
        <div className='grid grid-cols-12 p-8 gap-10'>
          <div className='col-span-6'>
            <p className='font-semibold text-lg text-neutral-800 dark:text-gray-200'>Activities</p>
            {taskActivities && taskActivities?.map((data) => (
              <div key={data._id}>
                <ActivityMessage data={data} />
              </div>
            ))}
          </div>

          <div className='col-span-6'>
            <div className="p-6 rounded-lg shadow-md ">
              <form onSubmit={handleSubmit(sendMessage)}>
                <div className=" flex flex-wrap items-center gap-5">
                  <div>
                    <label className="flex items-center space-x-2 text-neutral-800 dark:text-gray-200">
                      <input
                        type="radio"
                        name="activity"
                        value="started"
                        className="form-radio h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                        {...register('activity', { required: { value: true, message: 'Activity is required' } })}
                      />
                      <span>Started</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center space-x-2 text-neutral-800 dark:text-gray-200">
                      <input
                        type="radio"
                        name="activity"
                        value="completed"
                        className="form-radio h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 dark:border-gray-600 rounded"
                        {...register('activity', { required: { value: true, message: 'Activity is required' } })}
                      />
                      <span>Completed</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center space-x-2 text-neutral-800 dark:text-gray-200">
                      <input
                        type="radio"
                        name="activity"
                        value="in-progress"
                        className="form-radio h-5 w-5 text-yellow-600 focus:ring-yellow-500 border-gray-300 dark:border-gray-600 rounded"
                        {...register('activity', { required: { value: true, message: 'Activity is required' } })}
                      />
                      <span>In Progress</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center space-x-2 text-neutral-800 dark:text-gray-200">
                      <input
                        type="radio"
                        name="activity"
                        value="commented"
                        className="form-radio h-5 w-5 text-gray-600 focus:ring-gray-500 border-gray-300 dark:border-gray-600 rounded"
                        {...register('activity', { required: { value: true, message: 'Activity is required' } })}
                      />
                      <span>Commented</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center space-x-2 text-neutral-800 dark:text-gray-200">
                      <input
                        type="radio"
                        name="activity"
                        value="bug"
                        className="form-radio h-5 w-5 text-red-600 focus:ring-red-500 border-gray-300 dark:border-gray-600 rounded"
                        {...register('activity', { required: { value: true, message: 'Activity is required' } })}
                      />
                      <span>Bug</span>
                    </label>
                  </div>
                  <div>
                    <label className="flex items-center space-x-2 text-neutral-800 dark:text-gray-200">
                      <input
                        type="radio"
                        name="activity"
                        value="assigned"
                        className="form-radio h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 dark:border-gray-600 rounded"
                        {...register('activity', { required: { value: true, message: 'Activity is required' } })}
                      />
                      <span>Assigned</span>
                    </label>
                  </div>
                  <p className='text-red-500 text-left text-[15px] px-1 font-semibold'>{errors.activity?.message}</p>

                </div>
                <div className='mt-6'>
                  <h2 class="text-lg font-semibold mb-4 text-neutral-800 dark:text-gray-200">
                    Your Message
                  </h2>
                  <textarea
                    rows="5"
                    placeholder="Type your message here..."
                    class="w-full p-3 border border-gray-300 dark:border-neutral-600 rounded-lg focus:outline-none dark:bg-neutral-800 dark:text-gray-200"
                    {...register("message", { required: { value: true, message: 'Please provide message !' } })}
                  ></textarea>
                  <p className='text-red-500 text-left text-[15px] px-1 font-semibold'>{errors.message?.message}</p>

                  <div className='flex justify-start'>
                    <button
                      type="submit"
                      class="mt-4 py-2 px-5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-400 duration-500"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ActivitiesDetails