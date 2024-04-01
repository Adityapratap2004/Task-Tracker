import { createSlice } from '@reduxjs/toolkit';

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: null,
  reducers: {
    setTask(state, action) {
      return action.payload
    },

    addTask(state, action) {
      
      const addedTask = action.payload;

      const modifiedStatus = addedTask.status.replace(/\s/g, ''); // Remove spaces from the status string


      return { ...state, [modifiedStatus]: [...(state[modifiedStatus] || []), addedTask] }
    },

    deleteTask(state, action) {
      const deletedTask = action.payload;
      console.log(deletedTask);
      const modifiedStatus = deletedTask.status.replace(/\s/g, ''); // Remove spaces from the status string

      const currentTasks = state[modifiedStatus] || [];

      // Filter out the task with the given taskId
      const updatedTasks = currentTasks.filter(task => task._id !== deletedTask._id);

      // Update the state with the updated tasks
      return { ...state, [modifiedStatus]: updatedTasks };
    },

    editTask(state, action) {

      const editedTask = action.payload;

      const newState = { ...state };

      //deleting the task by id

      for (const status in newState) {
        if (newState.hasOwnProperty(status)) {
          newState[status] = newState[status].filter(task => task._id !== editedTask._id);
        }
      }

      //adding the edited task

      const modifiedStatus = editedTask.status.replace(/\s/g, ''); // Remove spaces from the status string
      newState[modifiedStatus] = [...(newState[modifiedStatus] || []), editedTask];

      return newState;

    }

  },
});

export const { setTask, addTask, deleteTask, editTask } = tasksSlice.actions;


export default tasksSlice.reducer;
