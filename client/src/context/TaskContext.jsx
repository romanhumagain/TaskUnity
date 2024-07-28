import { createContext, useContext, useState, useEffect } from "react";
import createAxiosInstance from "../api/axiosInstance";
import toast from 'react-hot-toast';
import { useAuth } from "./AuthContext";

const TaskContext = createContext();
export const useTask = () => useContext(TaskContext);

const TaskContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [tasksData, setTasksData] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [priority, setPriority] = useState("")
  const axiosInstance = createAxiosInstance();
  const { logoutUser } = useAuth();


  //function to fetch task
  const fetchTask = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get(`tasks/?priority=${priority}`)
      if (response.status === 200) {
        setTasksData(response.data)
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          logoutUser()
        }
      }
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }

  // function to delete task
  const deleteTask = async (task_id) => {
    try {
      const response = await axiosInstance.delete(`tasks/${task_id}/`)
      if (response.status === 200) {
        toast.success("Successfully deleted your task !")
        setIsDeleted(true)
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          logoutUser()
        }
        else {
          toast.error("Sorry, Couldn't delete your task !")
        }
      }
      console.log(error)
    }
  }
  useEffect(() => {
    fetchTask()
  }, [])

  useEffect(() => {
    if (isAdded === true || isDeleted === true || isUpdated === true) {
      fetchTask()
      resetData()
    }
  }, [priority, isAdded, isDeleted, isUpdated])

  const resetData = () => {
    setIsAdded(false)
    setIsDeleted(false)
    setIsUpdated(false)
  }

  const context = {
    tasksData,
    fetchTask,
    deleteTask,
    setIsAdded,
    setIsUpdated,
    setPriority,
    priority
  }

  return (
    <TaskContext.Provider value={context}>
      {children}
    </TaskContext.Provider>
  )
};

export default TaskContextProvider;