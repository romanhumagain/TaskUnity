import { createContext, useContext, useState, useEffect } from "react";
import createAxiosInstance from "../api/axiosInstance";
import toast from 'react-hot-toast';
import { useAuth } from "./AuthContext";

const TaskContext = createContext();
export const useTask = () => useContext(TaskContext);

const TaskContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [tasksData, setTasksData] = useState(null);
  const [completedTask, setCompletedTask] = useState(null)
  const [pendingTask, setPendingTask] = useState(null)
  const [overdueTask, setOverdueTask] = useState(null)
  const [importantTask, setImportantTask] = useState(null)
  const [allTasks, setAllTasks] = useState(null)
  const [taskDetails, setTaskDetails] = useState(null)

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

  // function to get all tasks 
  const fetchAllTask = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get(`tasks/all`)
      if (response.status === 200) {
        setAllTasks(response.data)
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

  // to fetch the specific task details 
  const fetchTaskDetails = async (id) => {
    try {
      setLoading(true)
      const response = await axiosInstance.get(`tasks/${id}`)
      if (response.status === 200) {
        setTaskDetails(response.data)
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

  // function to fetch completed task
  const fetchCompletedTask = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get(`tasks/completed-tasks/`)
      if (response.status === 200) {
        setCompletedTask(response.data)
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

  //function to fetch pending task
  const fetchPendingTask = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get(`tasks/pending-tasks/`)
      if (response.status === 200) {
        setPendingTask(response.data)
        console.log(response.data)
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

  //function to fetch pending task
  const fetchOverdueTask = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get(`tasks/overdue-tasks/`)
      if (response.status === 200) {
        setOverdueTask(response.data)
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

  //function to fetch pending task
  const fetchImportantTask = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance.get(`tasks/important-tasks/`)
      if (response.status === 200) {
        setImportantTask(response.data)
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

  // function to update task completion
  const handleTaskCompletion = async (completion_status, task_id) => {
    const data = { is_completed: completion_status === "completed" };

    try {
      const response = await axiosInstance.put(`tasks/${task_id}`, data);

      if (response.status === 200) {
        toast.success("Successfully updated task!");
        setIsUpdated(true);
      } else {
        // Handling other response status codes if necessary
        console.log(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          logoutUser();
          toast.error("Unauthorized");
        } else {
          // Handling other error response statuses
          toast.error(`Error: ${error.response.status} - ${error.response.data.message || 'An error occurred'}`);
        }
      } else {
        // Handling network or other errors
        toast.error("Network error or server not responding");
        console.log(error);
      }
    }

    console.log(data);
  };


  useEffect(() => {
    fetchTask()
  }, [priority])

  useEffect(() => {
    if (isAdded === true || isDeleted === true || isUpdated === true) {
      fetchTask()
      fetchPendingTask()
      fetchCompletedTask()
      fetchOverdueTask()
      fetchImportantTask()
      resetData()
    }
  }, [isAdded, isDeleted, isUpdated])

  const resetData = () => {
    setIsAdded(false)
    setIsDeleted(false)
    setIsUpdated(false)
  }
  const fetchALlCategoryTask = ()=>{
    fetchTask()
    fetchCompletedTask()
    fetchPendingTask()
    fetchOverdueTask()
  }


  const context = {
    tasksData,
    fetchTask,
    deleteTask,
    setIsAdded,
    setIsUpdated,
    setPriority,
    priority,
    pendingTask,
    completedTask,
    fetchCompletedTask,
    fetchPendingTask,
    fetchOverdueTask,
    handleTaskCompletion,
    overdueTask,
    fetchImportantTask,
    importantTask,
    allTasks,
    fetchAllTask,
    fetchTaskDetails,
    taskDetails,
    fetchALlCategoryTask
  }

  return (
    <TaskContext.Provider value={context}>
      {children}
    </TaskContext.Provider>
  )
};

export default TaskContextProvider;