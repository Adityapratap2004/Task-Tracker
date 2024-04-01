import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CiCalendarDate } from "react-icons/ci";
import TaskCategory from './TaskCategory';
import Form from './Form';
import useQuery from '../customHook/useQuery';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, setTask } from '../State/slice/taskSlice';



const Tasks = () => {


    const dispatch = useDispatch();
    const task = useSelector(state => state.task)
    const [filter, setFilter] = useState({ startDate: null, endDate: null, inputValue: "", priority: '' });
    const [taskPopup, setTaskPopup] = useState(false);
    const [loading, error, getQuery, postQuery] = useQuery();
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [sort, setSort] = useState('');


    //function to handle date 
    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setFilter(prevState => ({ ...prevState, startDate: start, endDate: end }));
    };

    //function to handle filter form 
    const handleChange = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    };


    const addTaskf = async (data) => {
        try {
            const addedTask = await postQuery('task', data);
            setTaskPopup(false);
            if (addedTask?.task?.status) {
                dispatch(addTask(addedTask.task))
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };



    const handleSortChange = (e) => {
        setSort(e.target.value);
    }

    useEffect(() => {

        const priorityOrder = { "P0": 0, "P1": 1, "P2": 2 };
        const sortByPriority = () => {
           
            const sortedTasks = { ...filteredTasks };
            for (const status in sortedTasks) {
                if (sortedTasks.hasOwnProperty(status)) {
                    sortedTasks[status].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
                }
            }
            setFilteredTasks(sortedTasks);
        };

        const sortByStartDate = () => {
            const sortedTasks = { ...filteredTasks };
            for (const status in sortedTasks) {
                if (sortedTasks.hasOwnProperty(status)) {
                    sortedTasks[status].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
                }
            }
            setFilteredTasks(sortedTasks);
        };

        const sortByEndDate = () => {
            const sortedTasks = { ...filteredTasks };
            for (const status in sortedTasks) {
                if (sortedTasks.hasOwnProperty(status)) {
                    sortedTasks[status].sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
                }
            }
            setFilteredTasks(sortedTasks);
        };
        
        if (sort === 'Priority') {
            sortByPriority();
        }
        else if (sort === 'Start Date') {
            sortByStartDate();
        }
        else if (sort === 'End Date') {
            sortByEndDate();
        }
        else {
            dispatch(setTask({ ...task }))
        }

    }, [sort])



    useEffect(() => {
        if (task) {
            const filteredTasks = {};
            for (const status in task) {
                if (task.hasOwnProperty(status)) {
                    filteredTasks[status] = task[status].filter(t => {
                        return (

                            (t.assignee?.name.toLowerCase().includes(filter.inputValue.toLowerCase()) || !filter.inputValue) &&
                            (t.priority === filter.priority || !filter.priority) &&
                            (!filter.startDate || new Date(t.startDate) >= new Date(filter.startDate)) &&
                            (!filter.endDate || new Date(t.endDate) <= filter.endDate)
                        );
                    });
                }
            }

            const id = setTimeout(() => {
                setFilteredTasks(filteredTasks);
            }, 1000)

            return () => {
                clearTimeout(id);
            }
        }
    }, [task, filter]);
   


    useEffect(() => {
        const fetchTask = async () => {
            try {
                const d = await getQuery('task');
                if (d?.task) {
                    dispatch(setTask(d.task));
                }
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTask();

    }, [])




    if (loading && task === null) {

        return (
            <div>
                Loading
            </div>
        )
    }


    return (
        <div className='border-2 relative border-white shadow-lg p-7 md:p-10 rounded-3xl justify-center '>
            <div className='flex justify-between relative '>
                <div className='flex  flex-col lg:flex-row gap-3 lg:gap-6 lg:items-center'>
                    <h2 className=' font-medium text-lg'>Filter By: </h2>
                    <form className='flex flex-wrap gap-2 md:gap-4 lg:gap-6'>
                        <div className='relative'>
                            <input type="text" placeholder='Assignee Name' name='inputValue' className='w-[160px] md:w-[215px] rounded-md  px-2 h-8  outline-none'
                                value={filter.inputValue}
                                onChange={handleChange}
                            />

                        </div>


                        <select name='priority' className='w-[160px] md:w-[215px] rounded-md  px-2 h-8 outline-none' onChange={handleChange}>
                            <option value=''>Priority</option>
                            <option value="P0">P0</option>
                            <option value="P1">P1</option>
                            <option value="P2" >P2</option>
                        </select>
                        <div className='relative '>
                            <DatePicker
                                selected={filter.startDate}
                                onChange={handleDateChange}
                                startDate={filter.startDate}
                                endDate={filter.endDate}
                                selectsRange
                                startDatePlaceholderText="From"
                                endDatePlaceholderText="To"
                                dateFormat="dd/MM/yyyy"
                                showTimeInput={false}
                                placeholderText="dd/mm/yyyy-dd/mm/yyyy"
                                className='px-2 h-8 pr-10 text-sm w-[215px] rounded-md outline-none'
                            />
                            <CiCalendarDate className='absolute text-2xl right-2 top-1.5 ' />
                        </div>
                    </form>
                </div>
                <button className='absolute right-0 lg:relative bg-[#2c649c] px-2 md:px-6 lg:px-2 xl:px-14   text-center h-8 py-1 rounded-md text-white' onClick={() => { setTaskPopup(true) }}>
                    Add New Task
                </button>
                {
                    taskPopup && <Form heading="Add Task" close={setTaskPopup} addTask={addTaskf} />
                }

            </div>
            <div className='mb-8 flex  flex-col lg:flex-row gap-3 py-2 lg:mx-1 lg:gap-6 lg:items-center'>
                <h2 className=' font-medium text-lg'>Sort By: </h2>
                <form>
                    <select name='sort' className='w-[160px] md:w-[215px] rounded-md  px-2 h-8 outline-none' onChange={handleSortChange} >
                        <option value=''>N/A</option>
                        <option value='Priority'>Priority</option>
                        <option value="Start Date">Start Date</option>
                        <option value="End Date">End Date</option>
                    </select>
                </form>
            </div>

            {/* <div className='flex overflow-x-auto gap-8 '> */}
            <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 '>

                <TaskCategory tasks={filteredTasks.Pending} color="#8c8b8f" heading="Pending" />
                <TaskCategory tasks={filteredTasks.InProgress} color="#e69923" heading="In Progress" />
                <TaskCategory tasks={filteredTasks.Completed} color='#42a81e' heading="Completed" />
                <TaskCategory tasks={filteredTasks.Deployed} color="#353976" heading="Deployed" />
                <TaskCategory tasks={filteredTasks.Deffered} color="#f68871" heading="Deffered" />


            </div>

        </div>
    )
}

export default Tasks
