import React, { useEffect, useState } from 'react'
import Form from './Form';
import useQuery from '../customHook/useQuery';
import { useDispatch } from 'react-redux';
import { deleteTask, editTask } from '../State/slice/taskSlice';

const EditDeletePopup = ({ close, task }) => {
    const dispatch = useDispatch();
    const [deletePopup, setDeletePopup] = useState(false);
    const [editPopup, setEditPopup] = useState(false);

    const [loading, error, getQuery, postQuery, deleteQuery, patchQuery] = useQuery();

    const deleteTaskf = async () => {
        try {
            
            const res = await deleteQuery(`task/${task._id}`);
            if (res?.deletedTask) {
                dispatch(deleteTask(res.deletedTask));
            }
        }
        catch (error) {
            console.error('Error adding task:', error);
        }
        finally {
            close(false);
        }
    }

    const closePopup = (e) => {

        e.stopPropagation();
        close(false)
    }

    const editTaskf = async (form) => {
        try {
            const res = await patchQuery('task', {taskId:form._id, priority: form.priority, status: form.status });
            if(res?.task){
                dispatch(editTask(res.task));
            }
        }
           catch (error) {
            console.error('Error adding task:', error);
        }
        finally {
            close(false);
        }
    }



    useEffect(() => {
        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = "auto"
        }
    }, [])
    return (
        <>
            <div className='fixed top-0 bottom-0 right-0 left-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,0.2)] ' onClick={closePopup}>

            </div>

            <div className=' absolute right-0 -bottom-4  bg-gray-50 text-gray-500 x text-base p-2 rounded-lg w-[150px] *:w-full *:px-2 *:text-left'>
                <button className=' border-b-2 border-white ' onClick={() => { setEditPopup(true) }}>Edit</button>
                {
                    editPopup && <Form heading="Edit Task" close={setEditPopup} editTask={editTaskf} task={task} />

                }
                <button onClick={() => { setDeletePopup(true) }}>Delete</button>
                {
                    deletePopup && <Form heading="Delete Task" deleteTask={deleteTaskf} close={setDeletePopup} />
                }
            </div>

        </>


    )
}

export default EditDeletePopup
