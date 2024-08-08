import { BrowserRouter as Router } from "react-router-dom"
import AppRoutes from "./AppRoutes"
import AuthContextProvider from "./context/AuthContext"
import TaskContextProvider from "./context/TaskContext"
import WorkspaceContextProvider from "./context/WorkspaceContext"
import WorkspaceChatContextProvider from "./context/WorkspaceChatContext"


function App() {
  return (
    <>
      <Router>
        <AuthContextProvider>
          <TaskContextProvider>
            <WorkspaceContextProvider>
              <WorkspaceChatContextProvider>
                <AppRoutes />
              </WorkspaceChatContextProvider>
            </WorkspaceContextProvider>
          </TaskContextProvider>
        </AuthContextProvider>
      </Router>
    </>
  )
}
export default App
