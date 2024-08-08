import { createContext, useContext, useEffect, useState } from 'react'
import createAxiosInstance from '../api/axiosInstance'
import { useAuth } from './AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const WorkspaceChatContext = createContext()
export const useWorkspaceChat = () => useContext(WorkspaceChatContext)

const WorkspaceChatContextProvider = ({ children }) => {
  const [messages, setMessages] = useState(null)
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [workspaceId, setWorkspaceId] = useState(null);
  const axiosInstance = createAxiosInstance();
  const [unreadMessage, setUnreadMessage] = useState(0)
  const [isMessageMarkedRead, setIsMessageMarkedRead] = useState(false)
  const { logoutUser } = useAuth();

  const read_workspace_message = async (workspace_id) => {
    try {
      const response = await axiosInstance.get(`workspace/message/${workspace_id}`);
      if (response.status === 200) {
        setMessages(response.data)
        console.log(response.data)
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

  const get_unread_message = async (workspace_id) => {
    try {
      const response = await axiosInstance.get(`workspace/message/unread/${workspace_id}`);
      if (response.status === 200) {
        setUnreadMessage(response.data.length)
        console.log(response.data)
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

  const send_message = async (workspace_id, data) => {
    try {
      const response = await axiosInstance.post(`workspace/message/${workspace_id}`, data);
      if (response.status === 200) {
        console.log(response.data)
        setIsMessageSent(true)
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

  const mark_all_message_read = async (workspace_id) => {
    try {
      const response = await axiosInstance.put(`workspace/message/mark_read/${workspace_id}`);
      if (response.status === 200) {
        setIsMessageMarkedRead(true)
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
    if (workspaceId) {
      get_unread_message(workspaceId)
      read_workspace_message(workspaceId)
    }

    if (isMessageSent) {
      read_workspace_message(workspaceId)
      setIsMessageSent(false)
    }
  }, [isMessageSent, workspaceId])

  useEffect(() => {
    if (isMessageMarkedRead) {
      get_unread_message(workspaceId);
      setIsMessageMarkedRead(false);
    }
  }, [isMessageMarkedRead])

  const context = {
    messages,
    read_workspace_message,
    send_message,
    setWorkspaceId,
    get_unread_message,
    unreadMessage,
    mark_all_message_read
  }
  return (
    <WorkspaceChatContext.Provider value={context}>
      {children}
    </WorkspaceChatContext.Provider>
  )
}

export default WorkspaceChatContextProvider;