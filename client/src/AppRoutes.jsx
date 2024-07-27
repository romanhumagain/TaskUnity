import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Sidebar from "./components/Sidebar"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import { jwtDecode } from "jwt-decode"

function AppRoutes() {
  const auth_token = localStorage.getItem("token")
  const [authToken, setAuthToken] = useState(auth_token ? auth_token : null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (authToken) {
      setUser(jwtDecode(authToken))
    }
  }, [authToken])

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
