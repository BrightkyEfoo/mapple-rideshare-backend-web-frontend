import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    position : 0,
    ordersHistory : null,
    // driversHistory : null

}

const AdminBookHistorySlice = createSlice({
    name : 'AdminBookHistory',
    initialState,
    reducers :{
        setHistory : (state , data)=>{
            state.ordersHistory = data.payload
        },
        setPosition : (state , data)=>{
            state.position = data.payload
        }
    }
})
const AdminBookHistoryReducer = AdminBookHistorySlice.reducer
export default AdminBookHistoryReducer
export const AdminBookHistoryActions = AdminBookHistorySlice.actions