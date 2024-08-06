import React, { useState } from 'react';
import createAxiosInstance from "../../api/axiosInstance";
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { FaUserCircle, FaTimes, FaUsers } from "react-icons/fa";
import loadingGif from '../../assets/loading.gif'
import { useWorkspace } from '../../context/WorkspaceContext';

const InviteModal = ({ isOpen, onClose, workspace_id }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState([]);
  const [emailError, setEmailError] = useState('');
  const axiosInstance = createAxiosInstance();
  const {setIsInvited} = useWorkspace()

  const closeModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const validateEmail = (email) => {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const addEmail = () => {
    if (email.trim() === '') {
      setEmailError('Email cannot be empty.');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Invalid email format.');
      return;
    }

    if (emails.includes(email)) {
      setEmailError('Email is already in the list.');
      return;
    }

    setEmails([...emails, email]);
    setEmail('');
    setEmailError('');
  };

  const handleRemoveEmail = (emailToRemove) => {
    setEmails(emails.filter(email => email !== emailToRemove));
  };

  const handleSubmit = async () => {
    if(emails.length<=0){
      toast.error('Failed to send invitations. Please provide email address');
    }
    else{
      const data = {
        emails: emails,
        workspace: workspace_id
      }
      try {
        setLoading(true)
        const response = await axiosInstance.post('/workspace/invite_users', data);
        if (response.status === 200) {
          setEmails([]);
          closeModal();
          toast.success('Invitations sent successfully!');
          setIsInvited(true)
        }
      } catch (error) {
        setLoading(false)
        toast.error('Failed to send invitations. Please try again.');
      }
      finally {
        setLoading(false)
      }
    }
  };

  return (
    <>
      
      <div className={`fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-60 transition-opacity ${isModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className={`relative max-w-md w-full p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-lg transform transition-transform duration-300 ${isModalOpen ? 'translate-y-0' : '-translate-y-20'}`}>
          <button
            type="button"
            className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={closeModal}
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          {loading && (
        <div>
          <div className="flex justify-center text-center">
            <img className='w-36 h-36' src={loadingGif} />
          </div>
        </div>
      )}

          <h2 className="text-xl font-bold text-gray-800 dark:text-white text-center mb-4">Invite Users</h2>

          <p className="text-gray-600 dark:text-gray-300 text-center mb-4">
            Enter the email addresses of users you want to invite. Each email will receive an invitation.
          </p>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="relative mb-4">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                  <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                  <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                </svg>
              </div>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                id="email-address-icon"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 dark:bg-neutral-700 dark:border-neutral-500 dark:placeholder-gray-400 dark:text-white focus:outline-none"
                placeholder="johndoe@gmail.com"
              />
            </div>

            <div className='flex justify-center'>
              <button
                type="button"
                onClick={addEmail}
                className="mt-5 bg-sky-500 text-white px-4 py-1 rounded-xl hover:bg-sky-600 transition duration-300"
                disabled={email.trim() === ''}
              >
                Add Email
              </button>
            </div>

            {emailError && (
              <p className="text-red-500 text-center mt-2">{emailError}</p>
            )}

            <div className="mt-2">
              <ul>
                {emails.map((email, index) => (
                  <li key={index} className="mt-1 flex items-center gap-2 text-neutral-800 dark:text-neutral-300 rounded-md p-1">
                    <FaUserCircle className='' />
                    <span>{email}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveEmail(email)}
                      className="ml-auto text-red-500 hover:text-red-700"
                    >
                      <FaTimes />
                      <span className="sr-only">Remove</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className='flex justify-center'>
              <button
                type="button"
                onClick={handleSubmit}
                className="mt-4 flex items-center gap-2 bg-rose-500 text-white px-4 py-1 hover:bg-rose-600 transition duration-200 rounded-lg"
              >
                <FaUsers />
                Invite People
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default InviteModal;
