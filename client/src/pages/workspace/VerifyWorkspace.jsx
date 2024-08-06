import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import createAxiosInstance from '../../api/axiosInstance'
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';
import { HiLink } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { useWorkspace } from '../../context/WorkspaceContext';

const VerifyWorkspace = () => {
  const [isVerified, setIsVerified] = useState(false)
  const [addedMembership, setAddedMembership] = useState(false)
  const params = useParams()
  const workspace_id = params.workspace_id
  const invitation_id = params.invitation_id
  const navigate = useNavigate()
  const axiosInstance = createAxiosInstance()
  const {setWorkspaceVerified} = useWorkspace();


  const verify_invited_user = async () => {
    const data = {
      workspace_id: workspace_id,
      invitation_id: invitation_id
    }

    try {
      const response = await axiosInstance.post('workspace/verify_invited_user/', data)
      if (response.status === 200) {
        setIsVerified(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const add_workspace_member = async () => {
    console.log("clicked")
    const data = {
      workspace_id: workspace_id,
    }

    try {
      const response = await axiosInstance.post('workspace/add_workspace_member/', data)
      if (response.status === 200) {
        setAddedMembership(true)
        toast.success('Congratulations ! You are now the member of this Workspace');
        setWorkspaceVerified(true)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    verify_invited_user()
  }, [workspace_id, invitation_id])

  return (
    <div className='min-h-screen w-full bg-gray-100 dark:bg-neutral-900 flex justify-center items-center'>
      <div className='max-w-lg w-full p-6 bg-white dark:bg-neutral-800 rounded-lg shadow-lg'>
        {isVerified ? (
          (!addedMembership ? (
            <div className='p-4 bg-teal-100 dark:bg-teal-200 border border-teal-300 dark:border-teal-700 rounded-lg text-teal-800  flex flex-col items-center'>
              <FaCheckCircle className='text-teal-600 dark:text-teal-500 text-4xl mb-4' />
              <p className='text-center font-semibold text-lg mb-4'>Your invitation has been successfully verified!</p>
              <div className='text-center'>
                <p
                  className='px-6 py-3 bg-teal-600 dark:bg-teal-500 text-white dark:text-gray-100 font-semibold rounded-lg shadow-md hover:bg-teal-700 dark:hover:bg-teal-600 transition-colors duration-300 flex items-center justify-center cursor-pointer'
                  onClick={() => add_workspace_member()}>
                  <HiLink className='mr-2' /> Join Workspace
                </p>
              </div>
            </div>
          ) : (
              <div className='text-center'>
                <p className='text-2xl font-semibold mb-4 text-teal-600 dark:text-teal-400'>Congratulations!</p>
                <p className='mb-6 text-gray-700 dark:text-gray-300'>Your invitation has been successfully verified. You can now access the workspace.</p>
                <div className='flex justify-center'>
                  <button className='px-6 py-3 bg-rose-600 dark:bg-rose-700 text-white dark:text-gray-100 font-semibold rounded-lg shadow-md hover:bg-rose-700 dark:hover:bg-rose-600 transition-colors duration-300 flex items-center'
                  onClick={()=>navigate(`/workspace/${workspace_id}`)}>
                  <span className='mr-2'>Go to Workspace</span>
                  <HiArrowRight className='text-lg' />
                </button>
                </div>
                
              </div>
          ))

        ) : (
          <div className='p-4 bg-red-100 dark:bg-red-800 border border-red-300 dark:border-red-700 rounded-lg text-red-800 dark:text-red-200 flex flex-col items-center'>
            <FaTimesCircle className='text-red-600 dark:text-red-400 text-4xl mb-4' />
            <p className='text-center font-semibold text-lg'>Invitation link expired or invalid.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default VerifyWorkspace