import React, { useState, useEffect, useRef } from 'react';
import { FaUsers } from "react-icons/fa";
import { useWorkspaceChat } from '../../context/WorkspaceChatContext';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import WorkspaceChatList from '../WorkspaceChatList';
import { IoMdSend } from "react-icons/io";

const WorkspaceMessageModal = ({ isOpen, onClose, workspace_id, workspaceName }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const endOfMessagesRef = useRef(null);
  const { send_message, setWorkspaceId, messages, read_workspace_message, mark_all_message_read } = useWorkspaceChat();
  const { user } = useAuth();

  setWorkspaceId(workspace_id)

  const form = useForm({
    defaultValues: {
      message: ''
    }
  });

  const { register, reset, handleSubmit, formState } = form;
  const { errors } = formState;


  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    // Scroll to the bottom of the messages
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []); // Run only once when component mounts

  const closeModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  // to send message
  const sendMessage = (data) => {
    send_message(workspace_id, data)
    reset()
  }

  useEffect(() => {
    read_workspace_message(workspace_id)
    mark_all_message_read(workspace_id)
  }, [workspace_id])

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex justify-end bg-black bg-opacity-60 transition-opacity duration-700 ${isModalOpen ? "opacity-100" : "opacity-0 invisible"}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="notification-modal-title"
      >
        <div
          className={`relative max-w-md w-full top-0 bottom-2 bg-gray-200 dark:bg-neutral-800 rounded-l-xl shadow-lg transform transition-transform duration-300 overflow-hidden`}
          role="document"
        >
          {/* Top of the page and fixed */}
          <div className='fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-4  bg-gray-300 dark:bg-neutral-800'>
            <div className='text-2xl text-neutral-800 dark:text-neutral-200 flex items-center gap-5'>
              <FaUsers />
              <h2 id="notification-modal-title" className="text-[16px] font-semibold">{workspaceName}</h2>
            </div>
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-700 dark:text-gray-200 bg-transparent hover:bg-gray-400 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-neutral-600 dark:hover:text-white"
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
          </div>

          <div className="pt-20 pb-16 overflow-y-auto h-[calc(100vh-50px)] bg-gradient-to-r from-gray-300 via-gray-400 to-gray-400 dark:from-zinc-800  dark:to-neutral-900">
            {messages && messages?.map((message) => (
              <WorkspaceChatList message={message} />
            ))}
            {/* Dummy div to scroll to the bottom */}
            <div ref={endOfMessagesRef} />
          </div>

          {/* Bottom of the page and fixed */}
          <form onSubmit={handleSubmit(sendMessage)}>
            <div className='fixed bottom-4 left-0 right-0 flex items-center gap-5 px-5  bg-gray-200 dark:bg-neutral-800'>
              <div className="flex-grow">
                <textarea className="block bg-gray-300 dark:bg-neutral-700 p-2 dark:text-gray-300 px-2 mt-1 focus:outline-none rounded-xl w-full h-12 shadow-lg" id="message" placeholder='Type message here...'
                  {...register("message", {
                    required: {
                      value: true,
                      message: 'Message is required !'
                    }
                  })}
                />
              </div>
              <button type='submit' className=' font-semibold text-sky-600 text-3xl'><IoMdSend /></button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default WorkspaceMessageModal;
