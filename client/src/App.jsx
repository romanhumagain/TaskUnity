import { BrowserRouter as Router } from "react-router-dom"
import AppRoutes from "./AppRoutes"
import AuthContextProvider from "./context/AuthContext"
import TaskContextProvider from "./context/TaskContext"
import WorkspaceContextProvider from "./context/WorkspaceContext"

function App() {
  return (
    <>
      <Router>
        <AuthContextProvider>
          <TaskContextProvider>
            <WorkspaceContextProvider>
              <AppRoutes />
            </WorkspaceContextProvider>
          </TaskContextProvider>
        </AuthContextProvider>
      </Router>
    </>
  )
}
export default App
