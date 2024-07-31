import React, { useState } from 'react';
import { IoAddCircle } from "react-icons/io5";
import createAxiosInstance from "../../api/axiosInstance";
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const ProfileModal = ({ isOpen, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [profilePic, setProfilePic] = useState(
    JSON.parse(localStorage.getItem("auth_user"))?.image_url || 'src/assets/pp.webp'
  );
  const [selectedFile, setSelectedFile] = useState(null);

  const axiosInstance = createAxiosInstance();
  const {setProfileUpdated} = useAuth()

  const user = JSON.parse(localStorage.getItem('auth_user'));

  const closeModal = () => {
    setIsModalOpen(false);
    onClose();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const updateProfile = async () => {
    try {
      const formData = new FormData();
      formData.append('profileImage', selectedFile);

      const response = await axiosInstance.put('/profile/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setProfilePic(response.data.profile.profileImage);
      toast.success("Successfully updated your profile picture")
      setProfileUpdated(true)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={`fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-60 duration-300 ${isModalOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className={`relative max-w-md w-full p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-lg transform transition-transform duration-300 ${isModalOpen ? 'translate-y-0' : '-translate-y-20'}`}>
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={closeModal}
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
            <span className="sr-only">Close modal</span>
          </button>

          <div className="text-center mt-5">
            <div className="relative">
              <img src={profilePic} alt="Profile" className="w-24 h-24 mx-auto rounded-full shadow-md" />
              <IoAddCircle className='text-rose-600 text-3xl absolute top-2 right-32' onClick={() => document.getElementById('fileInput').click()} />
              <input
                id="fileInput"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <h2 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-white">{user?.full_name}</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">{user?.email}</p>
            <p className="mt-1 text-gray-600 dark:text-gray-400">@{user?.username}</p>
            {selectedFile && (
              <button
                className="mt-4 bg-sky-500 text-white px-4 py-2 rounded-md"
                onClick={updateProfile}
              >
                Save Changes
              </button>
            )}
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default ProfileModal;
