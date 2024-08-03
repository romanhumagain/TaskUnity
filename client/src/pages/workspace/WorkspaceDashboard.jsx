import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import createAxiosInstance from '../../api/axiosInstance'
import { useAuth } from '../../context/AuthContext'
import { FaEnvelopeOpenText } from "react-icons/fa";
import projectCover from '../../../src/assets/project-cover.webp'
import InviteModal from '../../components/modal/InviteModal';
import { Toaster } from 'react-hot-toast';


const WorkspaceDashboard = () => {
  const params = useParams()
  const _id = params.id
  const axiosInstance = createAxiosInstance()
  const [workspaceDetails, setWorkspaceDetails] = useState(null)
  const [inviteModalOpen, setInviteModalOpen] = useState(false)
  const { logoutUser } = useAuth()

  const get_workspace_details = async () => {
    try {
      const response = await axiosInstance.get(`workspace/${_id}`)
      if (response.status === 200) {
        console.log(response.data)
        setWorkspaceDetails(response.data)
      };

    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          logoutUser()
        }
      };
      console.log(error)
    }
  }

  const handleCloseModal = () => {
    setInviteModalOpen(false);
  };

  useEffect(() => {
    get_workspace_details()
  }, [_id])

  return (
    <div className='min-h-screen w-full bg-gray-100 dark:bg-neutral-900 flex justify-center'>
      <div className='max-w-5xl w-full bg-gray-100 dark:bg-neutral-900'>
        <div className='bg-red-500 w-full mt-10 h-52 relative rounded-lg'>
          <div className='overflow-hidden'>
            <img src={projectCover} className='h-52 w-full object-cover rounded-lg'></img>
          </div>
          <div className='absolute -bottom-6 left-10 mt-10 bg-gray-300 dark:text-white/90 dark:bg-neutral-700 p-5 rounded-xl shadow-lg'>
            <p className='font-semibold'>{workspaceDetails?.name}</p>
          </div>
        </div>
        <div className='grid grid-cols-12 items-center mt-10 gap-10  '>
          <div className='p-2 text-md text-gray-700 font-semibold dark:text-neutral-400 col-span-10'>
            <p>{workspaceDetails?.description}</p>
          </div>
          <div className='col-span-2 flex justify-end'>
            <button className=' text-md font-semibold p-1 px-2 bg-neutral-900 text-white border-2 border-neutral-600 hover:bg-neutral-700  dark:bg-gray-200 dark:text-black/95 dark:border-gray-500 dark:hover:bg-gray-300 rounded-2xl duration-500 flex items-center gap-2' onClick={()=>setInviteModalOpen(true)}><FaEnvelopeOpenText /> Invite People</button>
          </div>
        </div>

        {/* for the main section */}

        {/* <div className='grid grid-cols-12 p-2 mt-5'>
          <div className='col-span-8 '>
            Task
          </div>

          <div className='col-span-4'>
            Users
          </div>

        </div> */}
      </div>
      {inviteModalOpen && (
        <InviteModal isOpen={inviteModalOpen} onClose={handleCloseModal} workspace_id={_id} />
      )}
      <Toaster />

    </div>
  )
}

export default WorkspaceDashboard