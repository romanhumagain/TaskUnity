import { useEffect, useState } from 'react'
import React from 'react'
import createAxiosInstance from '../api/axiosInstance'
import { useAuth } from '../context/AuthContext'
import default_img  from '../assets/pp.webp'

const Popover = ({ user_id, workspace_id }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null)
  const { logoutUser } = useAuth();

  const axiosInstance = createAxiosInstance();

  const fetchUserDetails = async () => {
    try {
      const response = await axiosInstance.get(`/profile/${user_id}/${workspace_id}`)
      if (response.status === 200) {
        const auth_user = {
          image_url: response.data.profile.profileImage || "",
          full_name: response.data.profile.user.full_name,
          username: response.data.profile.user.username,
          email: response.data.profile.user.email,
        }
        setUser(auth_user)
        setRole(response.data.membership.role)
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
    fetchUserDetails()
  }, [user_id, workspace_id])

  return (
    <>
      <div
        role="tooltip"
        className="absolute z-10 inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-gray-200 border border-gray-300 rounded-lg shadow-lg opacity-100 dark:text-gray-400 dark:bg-neutral-800 dark:border-neutral-600 mt-2"
      >
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <a href="#">
              <img
                src={user?.image_url ? user?.image_url : default_img}
                className="rounded-full w-10 h-10"
                alt="Profile"
              />
            </a>
            <div className='px-2'>
            <p className='py-[4px] px-2 rounded-2xl font-semibold text-neutral-800 dark:text-neutral-100 bg-gray-300 dark:bg-neutral-700 text-sm border border-neutral-400 dark:border-neutral-600'>{role?.charAt(0).toUpperCase() + role?.slice(1)}</p>
            </div>
          </div>
          <p className="text-base font-semibold leading-none text-gray-900 dark:text-white">
            <a href="#">{user?.full_name}</a>
          </p>
          <p className="mb-3 text-sm font-normal">
            <a href="#" className="hover:underline">@{user?.username}</a>
          </p>
          <p className=" text-sm">
            Member of TaskUnity
          </p>
          <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline"> taskunity.com</a>.

        </div>
      </div>
    </>
  )
}

export default Popover