import { createContext, useContext, useEffect, useState } from 'react'
import createAxiosInstance from '../api/axiosInstance'
import { useAuth } from './AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const WorkspaceTaskActivityContext = createContext()
export const useWorkspaceTaskActivity = () => useContext(WorkspaceTaskActivityContext)

const WorkspaceTaskActivityContextProvider = ({ children }) => {
  const [messages, setMessages] = useState(null)
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [workspaceId, setWorkspaceId] = useState(null);
  const [taskId, setTaskId] = useState(null)
  const axiosInstance = createAxiosInstance();
  const { logoutUser } = useAuth();


  const send_message = async (workspace_id, task_id, data) => {
    try {
      const response = await axiosInstance.post(`workspace/task/activity/${workspace_id}/${task_id}`, data);
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

  useEffect(() => {
    if (isMessageSent) {
      read_workspace_message(workspaceId)
      setIsMessageSent(false)
    }
  }, [isMessageSent])

  const context = {
    messages,
    read_workspace_message,
    send_message,
    setWorkspaceId,
    setTaskId,
  }
  return (
    <WorkspaceTaskActivityContext.Provider value={context}>
      {children}
    </WorkspaceTaskActivityContext.Provider>
  )
}

export default WorkspaceChatContextProvider;