import { BrowserRouter as Router } from "react-router-dom"
import AppRoutes from "./AppRoutes"
import AuthContextProvider from "./context/AuthContext"
import TaskContextProvider from "./context/TaskContext"

function App() {
  return (
    <>
      <Router>
        <AuthContextProvider>
          <TaskContextProvider>
            <AppRoutes />
          </TaskContextProvider>
        </AuthContextProvider>
      </Router>
    </>
  )
}
export default App
