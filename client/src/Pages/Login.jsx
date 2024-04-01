import React, { useState } from 'react'
import login_img from "../assets/images/login.png"
import { Link, useNavigate } from 'react-router-dom'
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import useAuth from '../customHook/useAuth';


const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, signUp, error, signIn] = useAuth();
    
    const nav=useNavigate();
    const login =async (e) => {
        try {
            e.preventDefault();
            await signIn(formData);
            const user = JSON.parse(localStorage.getItem('user'));
            if(user){  
                nav("/home")
            }

        } catch (error) {
            console.error(error);
        }

    }

    return (

        <div className='flex h-[100vh] mx-4 lg:mx-auto  max-w-[1024px] items-center  '>
            <div className='w-full flex  bg-white rounded-xl gap-6  p-6'>
                <div className='hidden sm:flex items-center bg-[#e2dbfc] w-[50%] rounded-xl  '>
                    <img src={login_img} alt="login_img" className='object-fit' />
                </div>
                <div className='w-full sm:w-[50%] my-16 '>
                    <h1 className='text-center text-2xl font-semibold mb-4 '>Log in</h1>
                    <form className='space-y-3' onSubmit={login}>

                        <div className='w-full space-y-1'>
                            <label htmlFor='Email'><span className='text-red-400'>* </span>Email</label> <br />
                            <input id='email' type='email' name="email" required placeholder='jhondoe@gmail.com' className='w-full  h-10 p-2 border border-gray-300 rounded-md outline-none focus:border-[#e2dbfc] focus:border-2' value={formData.email} onChange={(e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }} />
                        </div>
                        <div className='w-full space-y-1 relative'>
                            <label htmlFor='Password'><span className='text-red-400'>* </span>Password</label> <br />
                            <input id='password' type={showPassword ? 'text' : 'password'} required name="password" placeholder='password' className='w-full  h-10 p-2 pr-10 border border-gray-300 rounded-md outline-none focus:border-[#e2dbfc] focus:border-2' value={formData.password} onChange={(e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }} />
                            {showPassword ? <VscEye className='absolute bottom-3 right-4 cursor-pointer' onClick={() => { setShowPassword(false) }} /> : <VscEyeClosed className='absolute bottom-3 right-4 cursor-pointer' onClick={() => { setShowPassword(true) }} />}
                        </div>

                        <div>
                            <button type='submit' className='w-full h-10 text-center p-2 rounded-md bg-[#0ba6ff] text-white font-semibold my-3'>
                                {loading ? <div className='flex items-center justify-center gap-2 font-normal'><div className='w-5 h-5  rounded-full animate-spin border-2  border-white border-t-transparent' /><div>logging in...</div></div> : <span>Login in</span>}
                            </button>
                            <Link to="/signup" className='block w-full h-10 text-center p-2 rounded-md font-semibold border-2' >
                                Create account
                            </Link>
                        </div>
                    </form>
                </div>

            </div>

        </div>
    )
}

export default Login
