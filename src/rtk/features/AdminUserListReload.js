import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    trigger : false
}

const userList = createSlice({
    name : 'userList',
    initialState,
    reducers :{
        reload : state => {
            state.trigger = !state.trigger
        }
    }
})
const userListReducer = userList.reducer
export default userListReducer
export const userListActions = userList.actions