import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Sidebar from "./components/Sidebar"
import Home from "./pages/Home"

function App() {

  const user = {
    
  }

  return (
    <>
      {user ? (
        <div className="min-h-screen grid grid-cols-12">
          <Router>

            <div className="col-span-2">
              <Sidebar />
            </div>

            <div className="col-span-10">
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </div>
          </Router>
        </div>
      ) : (
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      )}
    </>
  )
}

export default App
