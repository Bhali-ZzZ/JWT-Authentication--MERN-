import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = () => {

    const [state , setState] = useState('login')
    const navigate = useNavigate()

    const {backendURL , setIsLoggedIn , getUserData} = useContext(UserContext)


    const [image , setImage] = useState(false)


    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const [number , setNumber] = useState('')
    const [location , setLocation] = useState('')

    const submitHandler = async (e) => {
      e.preventDefault();
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("number", number);
        formData.append("location", location);
        if (image) {
          formData.append("image", image); // Append image file
        }
    
        let response;
        if (state === "register") {
          response = await axios.post(backendURL + "/api/user/register", formData, {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data", // Ensure correct headers for file upload
            },
          });
        } else {
          response = await axios.post(
            backendURL + "/api/user/login",
            { email, password },
            { withCredentials: true }
          );
        }
    
        if (response.data.success) {
          toast.success(state === "register" ? "User Registered!" : "Login successful!");
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    };
    

  return (
    <div className='flex items-center justify-center py-20 bg-blue-500'>
      <div className='flex flex-col gap-3 max-w-90 sm:w-96 bg-white rounded-3xl shadow-lg p-6'>
        <p className='font-bold text-normal text-center sm:text-xl'>{state != 'login' ? 'Registration Your Account' : 'Login Your Account'}</p>
        <form onSubmit={submitHandler}>
        <div className={`flex items-center flex-col w-full mx-auto ${state == 'login' ? 'hidden' : 'flex'}`}>
        <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' accept='image/*' hidden/>
                <label htmlFor='image'>
                    <img className='w-24 cursor-pointer' src={image ? URL.createObjectURL(image) : assets.profileLogo} alt=''/>
                </label>
        <p className='text-gray-800'>Add Image</p>
        </div>
            <div className={`flex-col gap-1 items-start ${state == 'login' ? 'hidden' : 'flex'}`}>
                <p className='text-gray-800'>Name</p>
                <input onChange={(e)=>setName(e.target.value)} value={name} className='w-full py-2 px-4 border border-blue-200 rounded-lg outline-none' type='text' placeholder='Enter Your Name'/>
            </div>

            <div className='flex flex-col gap-1 items-start'>
                <p className='text-gray-800'>Email</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='w-full py-2 px-4 border border-blue-200 rounded-lg outline-none' type='email' placeholder='Enter Your Email'/>
            </div>

            <div className='flex flex-col gap-1 items-start'>
                <p className='text-gray-800'>Password</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} className='w-full py-2 px-4 border border-blue-200 rounded-lg outline-none' type='password' placeholder='Enter Your Password'/>
            </div>

            <div className={`flex-col gap-1 items-start ${state == 'login' ? 'hidden' : 'flex'}`}>
                <p className='text-gray-800'>Mobile Number</p>
                <input onChange={(e)=>setNumber(e.target.value)} value={number} className='w-full py-2 px-4 border border-blue-200 rounded-lg outline-none' type='number' placeholder='Enter Your Number'/>
            </div>

            <div className={`flex-col gap-1 items-start ${state == 'login' ? 'hidden' : 'flex'}`}>
                <p className='text-gray-800'>Location</p>
                <input onChange={(e)=>setLocation(e.target.value)} value={location} className='w-full py-2 px-4 border border-blue-200 rounded-lg outline-none' type='text' placeholder='Enter Your Location'/>
            </div>
            <button className='border w-full mt-4 bg-blue-500 rounded-lg px-6 py-2 text-white font-medium'>{state == 'login' ? 'Login' : 'Sign Up'}</button>
        </form>
        <div className='flex gap-1'>
        <p className='text-gray-800'>{state != 'login' ? "Already have an account?": "Don't have an account?"}</p>
        <p onClick={() => setState(state === 'login' ? 'register' : 'login')} className='text-blue-500 underline cursor-pointer'>
  {state === 'login' ? 'Register' : 'Login'}
</p>
        </div>
      </div>
    </div>
  )
}

export default Login
