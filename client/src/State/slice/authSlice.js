import {createSlice} from '@reduxjs/toolkit'

const initialState={
    user:null,
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser(state,action){
            const s={...state,user:action.payload}
            return s;
        },
        clearUser(state,action){
            return {...state,user:null}
        }
    }
})

export const {setUser,setError,clearUser}=authSlice.actions

export default authSlice.reducer;