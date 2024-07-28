import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { IoLogIn } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { ToastContainer } from 'react-toastify';
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const { register, handleSubmit, formState } = form;
  const { errors } = formState;
  const navigate = useNavigate();
  const {loginUser, logoutUser} = useAuth()

  return (
    <>
      <div className="h-screen flex items-center justify-center w-full  dark:bg-neutral-200">
        <div className="bg-slate-100 p-5 md:p-10 m-4 mx-auto rounded-xl shadow-2xl max-w-md w-full dark:bg-neutral-800/95 dark:text-gray-100 duration-300">
          <div className="text-center text-3xl mb-3">
            TaskUnity
          </div>
          <div className="text-center font-mono text-md text-gray-500 mt-2 mb-6 dark:text-gray-300 duration-150">
            Sign in to TaskUnity
          </div>
          <div>
            <form onSubmit={handleSubmit(loginUser)}>
              <div className="mb-4 m-3">
                <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-100 duration-150" htmlFor="email" >
                  Email
                </label>
                <input className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-400" id="email" type="email" placeholder="example@gmail.com"
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
                <input className="shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-slate-400 dark:focus:ring-gray-500" id="password" type="password" placeholder="Password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required !"
                    }
                  })} />
                <p className='text-red-500 text-left text-[15px] px-1 font-semibold'>{errors.password?.message}</p>
              </div>
              <div className="text-end mr-5">
                <p className="mt-3 text-gray-500 text-sm dark:text-gray-300 cursor-pointer">Forgot Password?</p>
              </div>
              <div className="mb-4 m-3">
                <button type='submit' className="bg-teal-500 hover:bg-teal-600 text-white font-semibold text-sm p-1 rounded-2xl w-full dark:bg-rose-600 dark:text-white dark:hover:bg-rose-700 transition-colors duration-500">
                  <IoLogIn className="inline text-[28px] mx-1" /> Sign In
                </button>
              </div>
            </form>
            <div className="flex items-center my-4">
              <hr className="flex-grow border-gray-400" />
              <p className="mx-2 text-gray-600 dark:text-gray-100">Or</p>
              <hr className="flex-grow border-gray-400" />
            </div>
            <div className="space-y-3 px-3">
              <button
                className="border-2 border-gray-400 bg-gray-100 hover:bg-gray-200 text-black font-semibold text-sm p-1 rounded-2xl w-full duration-300 dark:bg-gray-200 dark:hover:bg-gray-300">
                <FcGoogle className="inline text-[27px] mx-2" /> Sign In With Google
              </button>
            </div>
            <div className="flex justify-center gap-2 mt-5">
              <p className="text-sm font-semibold">Don't Have an Account?</p>
              <p className="text-sm font-semibold underline cursor-pointer" onClick={() => navigate('/register')}>Sign up</p>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Login;