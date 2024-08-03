import React, { createContext, useContext, useEffect, useState } from 'react'
import createAxiosInstance from '../api/axiosInstance'
import { useAuth } from './AuthContext'

const WorkspaceContext = createContext()
export const useWorkspace = () => useContext(WorkspaceContext)

const WorkspaceContextProvider = ({ children }) => {
  const [workspaceData, setWorkspaceData] = useState(null);
  const [isWorkspaceCreated, setIsWorkspaceCreated] = useState(false);
  const axiosInstance = createAxiosInstance();
  const {logoutUser} = useAuth();

  // to get the available workspaces
  const get_workspace = async ()=>{
    try {
      const response = await axiosInstance.get('workspace/')
      if(response.status===200){
        console.log(response.data)
        setWorkspaceData(response.data)
      };

    } catch (error) {
      if(error.response){
        if(error.response.status === 401){
          logoutUser()
        }
      };
      console.log(error)
    }
  }

  useEffect(()=>{
    if(isWorkspaceCreated){
      get_workspace();
      setIsWorkspaceCreated(false)
    }
  }, [isWorkspaceCreated])

  const context = {
    workspaceData,
    setIsWorkspaceCreated,
    get_workspace
  }
  return (
    <WorkspaceContext.Provider value={context}>
      {children}
    </WorkspaceContext.Provider>
  )
}

export default WorkspaceContextProvider