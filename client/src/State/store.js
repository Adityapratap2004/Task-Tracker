import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import  tasksSlice  from "./slice/taskSlice";

const store= configureStore({
    reducer:{
        auth:authSlice,
        task:tasksSlice
    }
})

export default store