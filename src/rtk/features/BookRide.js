import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    position : 0,
    drivers : null,
    route : {
        start : '',
        end : ''
    },
    selectedDriver : null,
    isDriversVisible : false,
    actualBooking : null,
    history : null
}

const BookRideSlice = createSlice({
    name : 'BookRide',
    initialState,
    reducers :{
        goForward : state => {
            state.position = state.position+1
        },
        setDrivers : (state , data)=>{
            state.drivers = data.payload
        },
        goBackward : state => {
            state.position = state.position-1
        },
        setRoute : (state,data)=>{
            state.route.start = data.payload.start
            state.route.end = data.payload.end
        },
        setPosition : (state,data)=>{
            state.position = data.payload
        },
        setSelectedDriver : (state, data)=>{
            state.selectedDriver = data.payload
        },
        setDriversVisible : (state , data)=>{
            state.isDriversVisible = data.payload
        },
        setActualBooking  :(state , data)=>{
            state.actualBooking = data.payload
        },
        setHistory : (state , data )=>{
            state.history = data.payload
        }
    }
})
const BookRideReducer = BookRideSlice.reducer
export default BookRideReducer
export const BookRideActions = BookRideSlice.actions