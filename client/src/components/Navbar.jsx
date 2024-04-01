import React from 'react'
import { FaUserAlt } from "react-icons/fa";
import useAuth from '../customHook/useAuth';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [loading, signUp, error, signIn,logOut]=useAuth();
    const nav=useNavigate();
    const handleLogout=async()=>{
        try {
            await logOut();
            nav('/login');
        } catch (error) {
            console.error(error);            
        }
        
    }
    return (
        <div className='flex items-center justify-between text-4xl font-bold px-6 my-7'>
            <h1>
                Task Board
            </h1>

            <div className='group cursor-pointer relative bg-white rounded-full p-3 text-3xl' onClick={handleLogout}>
                <FaUserAlt/>
                <span class=" z-40 absolute -bottom-10  right-0 scale-0 rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">Logout</span>
            </div>
            


        </div>
    )
}

export default Navbar
