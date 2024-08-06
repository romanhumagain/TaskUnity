import React, { useState, useEffect } from 'react';
import loading from '../../assets/loading.gif';
import createAxiosInstance from '../../api/axiosInstance'
import { useAuth } from '../../context/AuthContext'
import { formatDistanceToNow } from 'date-fns';
import { useWorkspace } from '../../context/WorkspaceContext';

const NotificationModal = ({ isOpen, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const axiosInstance = createAxiosInstance()
  const [notificationData, setNotificationData] = useState(null)
  const { logoutUser } = useAuth()
  const {mark_all_notification_read} = useWorkspace()

  const get_notification = async () => {
    try {
      const response = await axiosInstance.get('notification/')
      if (response.status === 200) {
        setNotificationData(response.data)
        console.log(response.data)
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          logoutUser()
        }
      }
      console.log(error)
    }
  }

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
    onClose();
    mark_all_notification_read()
  };
  useEffect(() => {
    get_notification()
  }, [])

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex justify-end bg-black bg-opacity-60 transition-opacity duration-700 ${isModalOpen ? "opacity-100" : "opacity-0 invisible"}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="notification-modal-title"
      >
        <div
          className={`relative max-w-sm w-full bg-gray-200 dark:bg-neutral-800 top-2 rounded-xl shadow-lg transform transition-transform duration-300`}
          role="document"
        >
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={closeModal}
            aria-label="Close modal"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
              />
            </svg>
          </button>
          <div className="p-4">
            <h2 id="notification-modal-title" className="text-xl font-semibold mb-2 text-gray-800 dark:text-neutral-200 p-1">Notification</h2>

            <div className="rounded-lg  mt-6 space-y-2 ">
              {notificationData && notificationData.map((data) => (
                <div key={data._id} className= {`${data.is_read?'bg-gray-200 dark:bg-neutral-700':'bg-gray-300 dark:bg-neutral-800'} p-2 border border-gray-200 dark:border-neutral-600 rounded-lg flex flex-col space-y-2 shadow-md`}>
                  <p className="text-gray-800 dark:text-neutral-200 font-medium">{data.description}</p>
                  <p className="text-sm text-gray-500 dark:text-neutral-500">
                    {formatDistanceToNow(new Date(data.createdAt), { addSuffix: true })}
                  </p>
                </div>
              ))}

            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationModal;
