import React, { createContext, useContext, useEffect, useState } from 'react'
import createAxiosInstance from '../api/axiosInstance'
import { useAuth } from './AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const WorkspaceContext = createContext()
export const useWorkspace = () => useContext(WorkspaceContext)

const WorkspaceContextProvider = ({ children }) => {
  const [workspaceData, setWorkspaceData] = useState(null);
  const [isWorkspaceCreated, setIsWorkspaceCreated] = useState(false);
  const [workspaceVerified, setWorkspaceVerified] = useState(false)
  const [isMarkedRead, setIsMarkedRead] = useState(false)
  const [unreadNotification, setUnreadNotification] = useState(0)
  const axiosInstance = createAxiosInstance();
  const [isInvited, setIsInvited] = useState(false)
  const [isWorkspaceDeleted, setIsWorkspaceDeleted] = useState(false)
  const { logoutUser } = useAuth();
  const navigate  = useNavigate();

  // to get the available workspaces
  const get_workspace = async () => {
    try {
      const response = await axiosInstance.get('workspace/')
      if (response.status === 200) {
        console.log(response.data)
        setWorkspaceData(response.data)
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

  const get_unread_notification = async () => {
    try {
      const response = await axiosInstance.get('notification/unread/')
      if (response.status === 200) {
        setUnreadNotification(response.data.length)
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          logoutUser()
        }
      };
      console.log(error)
    }
  };

  const mark_all_notification_read = async () => {
    try {
      const response = await axiosInstance.put('notification/mark-read/')
      if (response.status === 200) {
        setIsMarkedRead(true)
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          logoutUser()
        }
      };
      console.log(error)
    }
  };

  const delete_workspace = async (workspace_id) => {
    try {
      const response = await axiosInstance.delete(`workspace/delete/${workspace_id}/`);
      if (response.status === 200) {
        console.log(response.data)
        setIsWorkspaceDeleted(true)
        navigate('/')
        toast.success("Successfully deleted workspace !")
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          logoutUser()
        }
      };
      console.log(error)
    }
  }

  useEffect(() => {
    if (isWorkspaceCreated) {
      get_workspace();
      setIsWorkspaceCreated(false)
    }
    if (workspaceVerified) {
      get_workspace()
      setWorkspaceVerified(false)
    }
    if (isWorkspaceDeleted) {
      get_workspace();
      setIsWorkspaceDeleted(false)
    }
  }, [isWorkspaceCreated, workspaceVerified, isWorkspaceDeleted])

  useEffect(() => {
    get_unread_notification()
  }, [])

  useEffect(() => {
    if (isMarkedRead) {
      get_unread_notification()
      setIsMarkedRead(false)
    }
  }, [isMarkedRead])

  const context = {
    workspaceData,
    setIsWorkspaceCreated,
    get_workspace,
    isInvited,
    setIsInvited,
    setWorkspaceVerified,
    get_unread_notification,
    unreadNotification,
    mark_all_notification_read,
    delete_workspace
  }
  return (
    <WorkspaceContext.Provider value={context}>
      {children}
    </WorkspaceContext.Provider>
  )
}

export default WorkspaceContextProvider