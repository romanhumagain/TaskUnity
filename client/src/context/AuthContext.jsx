import React, { useState, useEffect, createContext, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import createAxiosInstance from "../api/axiosInstance";
import Toastify from "../utils/Toastify";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthContextProvider = ({ children }) => {
  const decodedUser = () => localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')).user : null
  const [user, setUser] = useState(decodedUser ? decodedUser : null)
  const [authUserProfile, setAuthUserProfile] = useState(() => localStorage.getItem("auth_user") ? JSON.parse(localStorage.getItem("auth_user")) : null)
  const [profileUpdated, setProfileUpdated] = useState(false)
  const axiosInstance = createAxiosInstance()
  const navigate = useNavigate()


  // function to handle the user login
  const loginUser = async (data) => {
    try {
      const response = await axiosInstance.post('/login-user/', data)
      if (response.status === 200) {
        localStorage.setItem("token", response.data?.token)
        fetchUserDetails()
        Swal.fire({
          title: "Success",
          text: "Successfully logged in your account !",
          icon: "success"
        });
        const decodedUser = jwtDecode(response.data?.token).user
        setUser(decodedUser)
        navigate('/')
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          Toastify("Invalid Credentials !", "error")
        }
        else if (error.response.status === 500) {
          Toastify("Sorry, Something went wrong. Please try again later !", "error")
        }
      }
    }
  }

  const fetchUserDetails = async () => {
    try {
      const response = await axiosInstance.get(`/profile`)
      if (response.status === 200) {
        const auth_user = {
          image_url: response.data.profile.profileImage || "",
          full_name: response.data.profile.user.full_name,
          username: response.data.profile.user.username,
          email: response.data.profile.user.email,
        }
        localStorage.setItem("auth_user", JSON.stringify(auth_user))
        setAuthUserProfile(auth_user)
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          logoutUser()
        }
      }
      console.log(error)
    }
  }

  // function to handle logout user
  const logoutUser = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("auth_user");
    setUser(null)
    navigate('/')
  }
  useEffect(()=>{
    if(profileUpdated){
      fetchUserDetails()
      setProfileUpdated(false)
    }
  }, [profileUpdated])

  const context = {
    user,
    loginUser,
    logoutUser,
    fetchUserDetails,
    authUserProfile,
    setProfileUpdated
  }
  return (
    <AuthContext.Provider value={context}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider