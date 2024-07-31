import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Sidebar from "./components/Sidebar"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import { useAuth } from "./context/AuthContext"
import CompletedTask from "./pages/Task/CompletedTask"
import OverdueTask from "./pages/Task/OverdueTask"
import PendingTask from "./pages/Task/PendingTask"
import ImportantTask from "./pages/Task/ImportantTask"
import TaskDetails from "./pages/Task/TaskDetails"


function AppRoutes() {
  const {user} = useAuth()
  
  return (
    <>
      {user ? (
        <div className="min-h-screen grid grid-cols-12">
          <div className="col-span-2">
            <Sidebar />
          </div>
          <div className="col-span-10">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/task" element={<Home />} />
              <Route path="/completed-task" element={<CompletedTask />} />
              <Route path="/pending-task" element={<PendingTask />} />
              <Route path="/overdue-task" element={<OverdueTask />} />
              <Route path="/important-task" element={<ImportantTask />} />
              <Route path="/task-details/:id" element={<TaskDetails />} />

            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </>
  )
}
export default AppRoutes
