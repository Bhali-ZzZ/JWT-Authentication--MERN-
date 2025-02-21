import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { UserContext } from '../context/UserContext';

const Hero = () => {

  const [show , setShow] = useState(false)

  const {userData} = useContext(UserContext)

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="max-w-90 sm:w-96 bg-white rounded-3xl shadow-lg p-6">
       <div className='flex justify-between py-3'>
        <div className='flex items-center'>
        <img className='w-20' src={assets.profileLogo} alt=''/>
        <div className='flex flex-col'>
        <p>{userData ? userData.name : 'Your Name'}</p>
        <p>{userData ? userData.email : 'yourmail@gmail.com'}</p>
        </div>
        </div>
        <p className='cursor-pointer'><i className="bx bx-cog text-3xl text-gray-700"></i></p>
       </div>
       <hr className='h-[2px] bg-slate-200'/>
       <div className='flex justify-between items-start sm:items-center flex-col sm:flex-row py-3 border-b-2'>
        <p className='font-medium'>Name</p>
        <p className='text-gray-600'>{userData ? userData.name : 'Your Name'}</p>
       </div>

       <div className='flex justify-between items-start sm:items-center flex-col sm:flex-row py-3 border-b-2'>
        <p className='font-medium'>Email account</p>
        <p className='text-gray-600'>{userData ? userData.email : 'youremail@gmail.com'}</p>
       </div>

       <div className='flex justify-between items-start sm:items-center flex-col sm:flex-row py-3 border-b-2'>
        <p className='font-medium'>Mobile Number</p>
        <p className='text-gray-600'>{userData ? userData.number : '+92000000000'}</p>
       </div>

       <div className='flex justify-between items-start sm:items-center flex-col sm:flex-row py-3 border-b-2'>
        <p className='font-medium'>Location</p>
        <p className='text-gray-600'>{userData ? userData.location : 'Your Location'}</p>
       </div>

       <div className='flex flex-col gap-2 text-white text-center w-fit bg-blue-500 font-bold px-4 py-2 mt-3 mx-auto rounded-lg'>
        <p onClick={()=>setShow(true)} className={`cursor-pointer font-medium ${show ? 'hidden' : 'flex'}`}>Social Accounts?</p>
        <div className={`${!show ? 'hidden' : 'flex space-x-4'}`}>
          <i className="bx bxl-facebook text-2xl"></i>
          <i className="bx bxl-instagram text-2xl"></i>
          <i className="bx bxl-github text-2xl"></i>
          <i className="bx bxl-linkedin text-2xl"></i>
        </div>

       </div>
      </div>
    </div>
  );
};

export default Hero;
