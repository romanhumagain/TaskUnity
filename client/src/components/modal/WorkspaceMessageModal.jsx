import React, { useState, useEffect } from 'react';

const WorkspaceMessageModal = ({ isOpen, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const closeModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex justify-end bg-black bg-opacity-60 transition-opacity duration-700 ${isModalOpen ? "opacity-100" : "opacity-0 invisible"}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="notification-modal-title"
      >
        <div
          className={`relative max-w-md w-full bg-gray-200 dark:bg-neutral-800 top-2 bottom-2 rounded-xl shadow-lg transform transition-transform duration-300`}
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
            <h2 id="notification-modal-title" className="text-xl font-semibold mb-2 text-gray-800 dark:text-neutral-200 p-1">Chat</h2>

            <div>
              Messages will be appear here !
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkspaceMessageModal;
