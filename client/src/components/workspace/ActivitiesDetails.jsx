import React from 'react'

const ActivitiesDetails = () => {
  return (
    <>
      <div className='bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-neutral-800 dark:via-neutral-900 dark:to-neutral-800  h-auto rounded-lg shadow-lg '>
        <div className='grid grid-cols-12 p-8'>
          <div className='col-span-6'>
            <p className='font-semibold text-lg text-neutral-800 dark:text-gray-200'>Activities</p>
          </div>

          <div className='col-span-6'>
            <div className="p-6 rounded-lg shadow-md ">

              <div className=" flex flex-wrap items-center gap-5">
                <div>
                  <label className=" items-center space-x-2 text-neutral-800 dark:text-gray-200">
                    <input
                      type="radio"
                      name="status"
                      value="started"
                      className="form-radio h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded"
                    />
                    <span>Started</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center space-x-2 text-neutral-800 dark:text-gray-200">
                    <input
                      type="radio"
                      name="status"
                      value="completed"
                      className="form-radio h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 dark:border-gray-600 rounded"
                    />
                    <span>Completed</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center space-x-2 text-neutral-800 dark:text-gray-200">
                    <input
                      type="radio"
                      name="status"
                      value="in-progress"
                      className="form-radio h-5 w-5 text-yellow-600 focus:ring-yellow-500 border-gray-300 dark:border-gray-600 rounded"
                    />
                    <span>In Progress</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center space-x-2 text-neutral-800 dark:text-gray-200">
                    <input
                      type="radio"
                      name="status"
                      value="commented"
                      className="form-radio h-5 w-5 text-gray-600 focus:ring-gray-500 border-gray-300 dark:border-gray-600 rounded"
                    />
                    <span>Commented</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center space-x-2 text-neutral-800 dark:text-gray-200">
                    <input
                      type="radio"
                      name="status"
                      value="bug"
                      className="form-radio h-5 w-5 text-red-600 focus:ring-red-500 border-gray-300 dark:border-gray-600 rounded"
                    />
                    <span>Bug</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center space-x-2 text-neutral-800 dark:text-gray-200">
                    <input
                      type="radio"
                      name="status"
                      value="assigned"
                      className="form-radio h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 dark:border-gray-600 rounded"
                    />
                    <span>Assigned</span>
                  </label>
                </div>
              </div>
              <div className='mt-6'>
                <h2 class="text-lg font-semibold mb-4 text-neutral-800 dark:text-gray-200">
                  Your Message
                </h2>
                <textarea
                  rows="5"
                  placeholder="Type your message here..."
                  class="w-full p-3 border border-gray-300 dark:border-neutral-600 rounded-lg focus:outline-none dark:bg-neutral-800 dark:text-gray-200"
                ></textarea>
                <div className='flex justify-start'>
                <button
                  type="submit"
                  class="mt-4 py-2 px-5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-400 duration-500"
                >
                  Submit
                </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ActivitiesDetails