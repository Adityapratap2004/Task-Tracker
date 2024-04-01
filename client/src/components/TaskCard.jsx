import React, { useState } from 'react'
import EditDeletePopup from './EditDeletePopup'


const TaskCard = ({ task }) => {
  const [editDelete, setEditDelete] = useState(false);

  return (
    // <div className='bg-[#f1f0f0] p-4 rounded-lg w-[250px] space-y-4'>
    <div className='bg-[#f1f0f0] p-4 rounded-lg  space-y-4 w-full'>
      <div className='flex justify-between pb-4  border-2 border-gray-300 border-t-0 border-l-0 border-r-0 '>
        <h1 className=' font-semibold text-xl'>
          {task?.title}
        </h1>
        <span className='text-white bg-[#2c649c] py-1 px-2'>
          {task?.priority}
        </span>
      </div>
      <div className='text-sm ' >
        {task?.description}
      </div>
      <div className='flex justify-between text-xl'>
        <div className=' font-semibold '>
          {task?.assignee?.name}
        </div>
        <div className='text-white bg-[#2c649c] text-2xl px-3 h-8  relative' onClick={() => { setEditDelete(true) }}>
          <span className=' cursor-pointer  '>⋮</span>

          {
            editDelete &&
            <EditDeletePopup close={setEditDelete} task={task} />
          }
        </div>
      </div>
      <div className='p-1 w-[150px] text-center rounded-md text-white bg-[#2c649c]'>
        {task?.status}
      </div>
    </div>
  )
}

export default TaskCard
