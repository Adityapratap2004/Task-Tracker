import React from 'react'
import TaskCard from './TaskCard'

const TaskCategory = ({tasks,color,heading}) => {
  return (
    // <div className='w-[280px]  bg-white rounded-lg   '>
      <div className=' bg-white rounded-lg   '> 
      <h1 className={`text-center text-2xl font-semibold p-2 text-white rounded-t-lg`} style={{backgroundColor: color}}>{heading}</h1>
      <div className='flex flex-col py-4 px-3 gap-3 items-center h-[600px] overflow-y-auto scrollbar-hide '>
         {
        tasks &&  tasks.map((task)=>{
            return <TaskCard task={task} key={task._id}/>
          })
         }
      </div>

    </div>
  )
}

export default TaskCategory
