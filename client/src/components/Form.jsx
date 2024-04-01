import React, { useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";

const Form = ({ heading, close, deleteTask, editTask ,addTask,task}) => {
    const closeTaskPopup = (e) => {
        e.stopPropagation()
         close(false);        
    }

    const disable=editTask?true:false;

    const initialState= task? {...task,assignee:task.assignee.email}: {title:"",description:"",assignee:"",priority:"P0",status:"Pending"};   
    const [form,setForm]=useState(initialState);

    const handleChange=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})        
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        deleteTask && deleteTask();
        editTask && editTask(form);
        addTask && addTask(form);
    }

    const resetForm=(e)=>{
        e.preventDefault()
        setForm(initialState);

    }

    useEffect(() => {
        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])
    return (
        <div className='w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.2)] fixed  top-0 bottom-0 right-0 left-0 flex items-center justify-center z-10' onClick={closeTaskPopup} >
            <form className='bg-white text-black ' onClick={(e)=>{e.stopPropagation()}} onSubmit={handleSubmit} >
                <div className='flex justify-between items-center  p-4 text-xl font-semibold  '>
                    <h1 className=' uppercase'>{heading}</h1>
                    <IoClose className='text-2xl cursor-pointer' onClick={closeTaskPopup} />
                </div>

                <div className=' bg-gradient-to-r from-[#f8dcfc] py-6  px-4 to-[#e2dbfc] space-y-4 text-lg '>

                    {
                        deleteTask &&
                        <div className='text-base'>
                            <p className=''>Do You Wish to Delete Task</p>
                            <div className='flex w-full  gap-24 mt-2 '>
                                <span className=' font-medium text-lg'>Task1</span>
                                <div className='flex gap-4 *:bg-[#2c649c] text-white  *:px-4  *:rounded-[4px]'>
                                    <button type='submit'>Yes</button>
                                    <button onClick={closeTaskPopup}>No</button>
                                </div>
                            </div>
                        </div>
                    }
                    {(editTask || addTask )&& <>  <div>
                        <label htmlFor='title'>Title:</label> <br />
                        <input disabled={disable} id='title' name="title" value={form.title} onChange={handleChange} placeholder='title of the task' className='w-full  h-10 p-2 border border-gray-400  rounded-md outline-none text-base ' />
                    </div>
                        <div >
                            <label htmlFor='description'>Description:</label> <br />
                            <textarea disabled={disable} id='description' name='description' onChange={handleChange} value={form.description} placeholder='description of the task' className='w-full h-32 p-2 border border-gray-400  rounded-md outline-none text-base   ' />
                        </div>
                        <div>
                            <label htmlFor='assignee'>Assignee:</label> <br />
                            <input disabled={disable} id='assignee' name='assignee' value={form.assignee} onChange={handleChange} placeholder='@assignne email' className='w-full  h-10 p-2 border border-gray-400  rounded-md outline-none text-base  ' />
                        </div>

                        <div className='flex gap-7'>
                            <div className='flex gap-2'>
                                <label htmlFor='priority'>Priority:</label>
                                <select id='priority' name='priority' value={form.priority} onChange={handleChange} className='p-1 border border-gray-400  rounded-md outline-none text-base '>
                                    <option value='P0'>P0</option>
                                    <option value='P1'>P1</option>
                                    <option value='P2'>P2</option>
                                </select>
                            </div>
                            <div className='flex gap-2'>
                                <label>Status:</label>
                                <select value={form.status} name='status' onChange={handleChange} className='p-1 border border-gray-400  rounded-md outline-none text-base ' >
                                    <option>Pending</option>
                                    <option>In Progress</option>
                                    <option>Completed</option>
                                    <option>Deployed</option>
                                    <option>Deffered</option>
                                </select>
                            </div>

                        </div>
                    </>}
                </div>
                {(editTask || addTask) && <div className='flex justify-end text-white  gap-4 px-4 py-3 *:bg-[#2c649c]  *:px-4 *:py-0.5 *:rounded-[4px]'>
                    <button type='submit'>Submit</button>
                    <button onClick={resetForm}>Reset</button>
                </div>}
            </form>


        </div>
    )
}

export default Form
