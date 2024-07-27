import { GoFileSubmodule } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import Toastify from "../utils/Toastify";
import createAxiosInstance from "../api/axiosInstance";

const Register = () => {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      full_name: "",
      username: "",
      email: "",
      password: ""
    },
    mode: "onSubmit"
  });

  const { register, formState, handleSubmit, reset } = form
  const { errors } = formState
  const axiosInstance = createAxiosInstance()

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post('register-user/', data)
      if (response.status === 201) {
        Toastify("Successfully registered your account !", "success")
        reset()
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          Toastify("This email is already registered !", "warning")
        }
        else if (error.response.status === 500) {
          Toastify("Sorry, Your account couldn't be registered!", "error")
        }
      }
    }
  };

  return (
    <>
      <div className=' h-screen w-full flex items-center justify-center dark:bg-neutral-200'>
        <div className='bg-slate-100 p-8 m-4 mx-auto rounded-lg shadow-2xl max-w-md w-full dark:bg-neutral-800/95 dark:text-gray-100 duration-300'>
          <div className="text-center text-3xl mb-2">
            TaskUnity
          </div>
          <div className="text-center font-mono text-md text-gray-500 mt-2 mb-6 dark:text-gray-300 duration-150  ">
            Sign Up To TaskUnity
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 m-3">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-100 duration-150" htmlFor="full_name" >
                Full Name
              </label>
              <input className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-400" id="full_name" type="text" placeholder='Full Name'
                {...register("full_name", {
                  required: {
                    value: true,
                    message: "Full name is required!"
                  }
                })} />
              <p className='text-red-500 text-left text-[15px] px-1 font-semibold'>{errors.full_name?.message}</p>
            </div>
            <div className="mb-4 m-3">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-100 duration-150" htmlFor="username">
                Username
              </label>
              <input className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-400" id="username" type="text" placeholder='Username'
                {...register("username", {
                  required: {
                    value: true,
                    message: "Username is required !"
                  }
                })} />
              <p className='text-red-500 text-left text-[15px] px-1 font-semibold'>{errors.username?.message}</p>
            </div>
            <div className="mb-4 m-3">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-100 duration-150" htmlFor="email">
                Email
              </label>
              <input className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-400 " id="email" type="email" placeholder='example@gmail.com'
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required !"
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email format !"
                  },
                })} />
              <p className='text-red-500 text-left text-[15px] px-1 font-semibold'>{errors.email?.message}</p>
            </div>
            <div className="mb-4 m-3">
              <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-100 duration-150" htmlFor="password">
                Password
              </label>
              <input className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-400" id="password" type="password" placeholder='Password'
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required"
                  },
                  validate: {
                    passwordLength: (fieldValue) => {
                      return (fieldValue.length > 8 || "Password should be at leat 8 character long !")
                    }
                  }
                })} />
              <p className='text-red-500 text-left text-[15px] px-1 font-semibold'>{errors.password?.message}</p>
            </div>
            <div className='className="mb-4 m-3 mt-5'>
              <button className="bg-rose-500 hover:bg-rose-600  text-white font-semibold text-sm p-1 rounded-2xl w-full dark:bg-rose-600 dark:text-white dark:hover:bg-rose-700 transition-colors duration-300">
                <GoFileSubmodule className="inline text-[26px] mx-1" /> Sign Up
              </button>
            </div>
          </form>
          <div className='text-center mt-4 px-4'>
            <div>
              <div className="flex justify-center gap-2 mt-5">
                <p className="text-sm font-semibold">Don't Have an Account?</p>
                <p className="text-sm font-semibold underline cursor-pointer" onClick={() => navigate('/')}>Sign In</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  )
}
export default Register