import React, { useState } from 'react'
import signup_img from "../assets/images/sign.png"
import { Link, useNavigate } from 'react-router-dom'
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import useAuth from '../customHook/useAuth';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", password: "", cpassword: "" });
    const [loading, signUp] = useAuth();
    const nav=useNavigate();

    const singup =async (e) => {
        try {
            e.preventDefault();
            await signUp(formData);
            const user =JSON.parse(localStorage.getItem('user'));
            if(user){
                nav('/home');
            }

        } catch (error) {
            console.error(error);
        }

    }

    return (

        <div className='flex h-[100vh] mx-4 lg:mx-auto  max-w-[1024px] items-center '>
            <div className='w-full flex  bg-white rounded-xl gap-6  p-6'>
                <div className='w-full sm:w-[50%] '>
                    <h1 className='text-center text-2xl font-semibold mb-4 '>Create an account</h1>
                    <form className='space-y-3' onSubmit={singup}>
                        <div className='w-full space-y-1'>
                            <label htmlFor='Name'><span className='text-red-400'>* </span>Name</label> <br />
                            <input id='name' name="name" type='text' required placeholder='jhon doe' className='w-full  h-10 p-2 border border-gray-300 rounded-md outline-none focus:border-[#e2dbfc] focus:border-2' value={formData.name} onChange={(e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }} />
                        </div>
                        <div className='w-full space-y-1'>
                            <label htmlFor='Email'><span className='text-red-400'>* </span>Email</label> <br />
                            <input id='email' type='email' name="email" required placeholder='jhondoe@gmail.com' className='w-full  h-10 p-2 border border-gray-300 rounded-md outline-none focus:border-[#e2dbfc] focus:border-2' value={formData.email} onChange={(e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }} />
                        </div>
                        <div className='w-full space-y-1 relative'>
                            <label htmlFor='Password'><span className='text-red-400'>* </span>Password</label> <br />
                            <input id='password' type={showPassword ? 'text' : 'password'} required name="password" placeholder='password' className='w-full  h-10 p-2 pr-10 border border-gray-300 rounded-md outline-none focus:border-[#e2dbfc] focus:border-2' value={formData.password} onChange={(e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }} />
                            {showPassword ? <VscEye className='absolute bottom-3 right-4 cursor-pointer' onClick={() => { setShowPassword(false) }} /> : <VscEyeClosed className='absolute bottom-3 right-4 cursor-pointer' onClick={() => { setShowPassword(true) }} />}
                        </div>
                        <div className='w-full space-y-1 '>
                            <label htmlFor='cpassword'><span className='text-red-400'>* </span>Confirm Password</label> <br />
                            <input id='cpassword' type="password" name="cpassword" required placeholder='confirm password' className='w-full  h-10 p-2 pr-10 border border-gray-300 rounded-md outline-none focus:border-[#e2dbfc] focus:border-2' value={formData.cpassword} onChange={(e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }} />

                        </div>
                        <div>
                            <button type='submit' className='w-full h-10 text-center p-2 rounded-md bg-[#0ba6ff] text-white font-semibold my-3'>
                                {loading ? <div className='flex items-center justify-center gap-2 font-normal'><div className='w-5 h-5  rounded-full animate-spin border-2  border-white border-t-transparent' /><div>creating account...</div></div> : <span>Create Account</span>}
                            </button>
                            <Link to="/login" className='block w-full h-10 text-center p-2 rounded-md font-semibold border-2' >
                                Login in
                            </Link>
                        </div>
                    </form>
                </div>
                <div className='hidden sm:flex items-center bg-[#e2dbfc] w-[50%] rounded-xl  '>
                    <img src={signup_img} alt="signup_img" className='object-fit' />
                </div>
            </div>

        </div>
    )
}

export default Signup
