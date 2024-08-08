import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import createAxiosInstance from '../../api/axiosInstance'
import { useAuth } from '../../context/AuthContext'
import { FaEnvelopeOpenText } from "react-icons/fa";
import projectCover from '../../../src/assets/project-cover.webp'
import InviteModal from '../../components/modal/InviteModal';
import { MdVerifiedUser } from "react-icons/md";
import { MdPending } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaCode } from "react-icons/fa";
import { BiSolidUserAccount } from "react-icons/bi";
import { FaUserSlash } from "react-icons/fa";
import pp_img from '../../assets/pp.webp'
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { useWorkspace } from '../../context/WorkspaceContext';
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Swal from 'sweetalert2';
import PageNotFound from '../../components/PageNotFound';
import Popover from '../../components/Popover';
import WorkspaceAddTaskModal from '../../components/modal/WorkspaceAddTaskModal';
import WorkspaceMessageModal from '../../components/modal/WorkspaceMessageModal';
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { useWorkspaceChat } from '../../context/WorkspaceChatContext';

const WorkspaceDashboard = () => {
  const params = useParams()
  const _id = params.id
  const axiosInstance = createAxiosInstance()
  const [isAuthorizedUser, setIsAuthorizedUser] = useState(false)
  const [workspaceDetails, setWorkspaceDetails] = useState(null)
  const [inviteModalOpen, setInviteModalOpen] = useState(false)
  const [verifiedMember, setVerifiedMember] = useState(null)
  const [pendingMember, setPendingMember] = useState(null)
  const [removedInvitation, setRemovedInvitation] = useState(false)
  const { logoutUser, user } = useAuth()
  const { isInvited, setIsInvited, delete_workspace } = useWorkspace()
  const [hoveredUser, setHoveredUser] = useState(null);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)
  const [isChatModalOpen, setIsChatModalOpen] = useState(false)
  const [workspaceName, setworkspaceName] = useState(null)

  const {get_unread_message, unreadMessage} = useWorkspaceChat()

  const handleAddTaskModal = () => {
    setIsAddTaskModalOpen(true);
  };
  const verify_workspace = async () => {
    try {
      const response = await axiosInstance.delete(`workspace/verify/${_id}/`);
      if (response.status === 200) {
        setIsAuthorizedUser(true)
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setIsAuthorizedUser(false)
        }
      };
      console.log(error)
    }
  }

  const get_workspace_details = async () => {
    try {
      const response = await axiosInstance.get(`workspace/${_id}`)
      if (response.status === 200) {
        console.log(response.data)
        setWorkspaceDetails(response.data)
        setworkspaceName(response.data.name)
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

  const get_workspace_member = async () => {
    try {
      const response = await axiosInstance.get(`workspace/member/${_id}`)
      if (response.status === 200) {
        console.log(response.data)
        setVerifiedMember(response.data.verified_member)
        console.log(response.data.verified_member)
        setPendingMember(response.data.pending_member)
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

  const remove_invitation = async (_id) => {
    try {
      const response = await axiosInstance.delete(`workspace/${_id}/`)
      if (response.status === 200) {
        setRemovedInvitation(true)
        toast.success("Successfully removed invitation !")

      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleCloseModal = () => {
    if (inviteModalOpen) {
      setInviteModalOpen(false);
    }

    if (isAddTaskModalOpen) {
      setIsAddTaskModalOpen(false);
    }
    if (isChatModalOpen) {
      setIsChatModalOpen(false);
    }
  };

  const handleDeleteWorkspace = (workspace_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#808080",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        delete_workspace(workspace_id)
      }
    });
  }

  const bg_colors = [
    "red", "teal", "sky", "rose", "purple", "yellow"
  ]

  useEffect(() => {
    verify_workspace()
    get_workspace_details()
    get_workspace_member()
    get_unread_message(_id)
  }, [_id])

  useEffect(() => {
    if (removedInvitation) {
      get_workspace_member()
      setRemovedInvitation(false)
    }
    if (isInvited) {
      get_workspace_member()
      setIsInvited(false)
    }
  }, [removedInvitation, isInvited])

  return (
    isAuthorizedUser ? (
      <div className='min-h-screen w-full bg-gray-100 dark:bg-neutral-900 flex justify-center'>
        <div className='max-w-6xl w-full bg-gray-100 dark:bg-neutral-900'>
          <div className=' w-full mt-10 h-52 relative rounded-lg mb-10'>
            <div className='flex justify-end'>
            <div className="relative inline-flex items-center">
                  <p
                    className="text-3xl cursor-pointer"
                    onClick={() => setIsChatModalOpen(true)}
                  >
                    <IoChatbubbleEllipsesSharp />
                    {unreadMessage > 0 && (
                      <span className="absolute -top-2 -right-2  w-5 h-5 text-xs font-medium text-white bg-red-500 rounded-full flex items-center justify-center">
                        {unreadMessage}
                      </span>
                    )}
                  </p>
                </div>

              </div>
            <div className='overflow-hidden'>
              <img src={projectCover} alt='Project Cover' className='h-52 w-full object-cover rounded-lg' />
            </div>
            <div className='absolute flex items-center gap-2 -bottom-6 left-10 mt-10 bg-gray-300 dark:text-white/90 dark:bg-neutral-700 p-5 rounded-xl shadow-lg'>
              <p className='text-rose-500 text-xl'><FaCode /></p>
              <p className='font-semibold'>{workspaceDetails?.name}</p>
            </div>
          </div>
          <div className='grid grid-cols-12 items-center mt-16 gap-9'>
            <div className='p-2 text-md text-gray-700 font-semibold dark:text-neutral-400 col-span-9'>
              <p>{workspaceDetails?.description}</p>
            </div>
            <div className='col-span-2 flex justify-end'>
              <button
                className='text-md font-semibold p-1 px-2 bg-neutral-900 text-white border-2 border-neutral-600 hover:bg-neutral-700 dark:bg-gray-200 dark:text-black/95 dark:border-gray-500 dark:hover:bg-gray-300 rounded-2xl duration-500 flex items-center gap-2'
                onClick={() => setInviteModalOpen(true)}
              >
                <FaEnvelopeOpenText /> Invite People
              </button>
            </div>

            {workspaceDetails?.created_by === user._id && (
              <div className='col-span-1 flex justify-end'>
                <div className='flex gap-1 px-5'>
                  <p className='text-teal-600 text-[22px] cursor-pointer'><FaEdit /></p>
                  <p className='text-rose-500 text-2xl cursor-pointer' onClick={() => handleDeleteWorkspace(workspaceDetails._id)}><MdDelete /></p>
                </div>
              </div>
            )}
          </div>

          <div className='grid grid-cols-12 p-2 mt-5'>
            <div className='col-span-8'>
              <div className={`${workspaceDetails?.created_by === user._id ? '' : 'hidden'} flex flex-wrap gap-10`} >
                <div className="bg-gray-200 dark:bg-neutral-800 max-w-[300px] w-full min-h-64 rounded-2xl flex items-center justify-center shadow-xl cursor-pointer" onClick={() => setIsAddTaskModalOpen(true)}>
                  <p className="flex items-center gap-2 text-neutral-800 dark:text-gray-200">
                    <IoMdAddCircleOutline className="text-3xl" />
                    <p className="text-lg">Add new Task</p>
                  </p>
                </div>
              </div>
            </div>

            <div className='col-span-4'>
              <div className='shadow-lg rounded-lg p-4'>
                <p className='font-semibold text-[17px] mb-2 flex items-center gap-2 text-neutral-800 dark:text-neutral-200'>
                  <MdVerifiedUser className='text-xl text-green-500' /> Verified Member
                </p>
                <hr className='border border-neutral-300 dark:border-neutral-700 mb-2' />
                <div>
                  {verifiedMember && verifiedMember.length > 0 ? (
                    verifiedMember.map((data, i) => (
                      <div key={data._id} className='grid grid-cols-12 mb-2 items-center text-neutral-700 dark:text-neutral-400 gap-5'>
                        <div className='col-span-1'>
                          <div className='relative'>


                            <p className={`p-[3px] text-sm font-semibold text-white inline bg-${bg_colors[i]}-500 rounded-full cursor-pointer`}
                              onMouseEnter={() => setHoveredUser(data.user._id)}
                              onMouseLeave={() => setHoveredUser(null)}>
                              {data.user.full_name.split(' ')[0].charAt(0)}{data.user.full_name.split(' ')[1].charAt(0)}
                            </p>

                            {hoveredUser === data.user._id && (
                              <Popover user_id={data.user._id} workspace_id={_id} />
                            )}
                          </div>

                        </div>
                        <div className='col-span-7'>
                          <p>{data.user.full_name}</p>
                        </div>
                        <div className='col-span-4'>
                          {data.role === "admin" ? (
                            <p className='text-md flex items-center gap-1 font-semibold'>
                              <MdAdminPanelSettings className='text-teal-500 text-xl' /> Admin
                            </p>
                          ) : (
                            <p className='text-md flex items-center gap-1 font-semibold'>
                              <BiSolidUserAccount className='text-rose-500 text-lg' /> Member
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No members found</p>
                  )}
                </div>

                {pendingMember && pendingMember.length > 0 && (
                  <div>
                    <p className='font-semibold text-[17px] mt-5 mb-2 flex items-center gap-2 text-neutral-800 dark:text-neutral-200'>
                      <MdPending className='text-xl text-red-500' /> Pending Member
                    </p>
                    <hr className='border border-neutral-300 dark:border-neutral-700 mb-2' />
                    {pendingMember.map((data, ind) => (
                      <div key={data._id} className='mb-2'>
                        <div className='grid grid-cols-12 items-center text-neutral-700 dark:text-neutral-400'>
                          <div className='col-span-1 flex items-center justify-center'>
                            <p className='font-semibold'>{ind + 1}.</p>
                          </div>
                          <div className='col-span-10'>
                            <p>{data.invited_email}</p>
                          </div>
                          <div className='col-span-1 flex justify-center'>
                            {user._id === data.inviter && (
                              <p
                                className='text-red-500 text-md hover:text-red-700 transition-colors duration-300 cursor-pointer'
                                aria-label='Remove user'
                                onClick={() => remove_invitation(data._id)}
                              >
                                <FaUserSlash />
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {inviteModalOpen && (
          <InviteModal isOpen={inviteModalOpen} onClose={handleCloseModal} workspace_id={_id} />
        )}
        {isAddTaskModalOpen && (
          <WorkspaceAddTaskModal isOpen={isAddTaskModalOpen} onClose={handleCloseModal} verifiedMember={verifiedMember} workspace_id={_id} />
        )}
        {isChatModalOpen && (
          <WorkspaceMessageModal isOpen={isChatModalOpen} onClose={handleCloseModal} workspace_id={_id} workspaceName = {workspaceName} />
        )}
        <Toaster />
      </div>
    ) : (
      <PageNotFound navigateTo={"/"} />
    )
  )
}

export default WorkspaceDashboard