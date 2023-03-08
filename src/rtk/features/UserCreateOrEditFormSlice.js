import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    isVisible : false,
    userTemplate : null,

}

const UserCreateOrEdit = createSlice({
    name : 'UserCreateOrEdit',
    initialState,
    reducers :{
        setIsVisible : (state,data)=>{
            state.isVisible = data.payload
            if(data.payload === false){
                state.userTemplate = null
            }
        },
        setUser : (state , data)=>{
            state.userTemplate = data.payload
        }
    }
})
const UserCreateOrEditReducer = UserCreateOrEdit.reducer
export default UserCreateOrEditReducer
export const UserCreateOrEditActions = UserCreateOrEdit.actions