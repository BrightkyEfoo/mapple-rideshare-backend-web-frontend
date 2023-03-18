import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  bookingHistory: null,
  newBooking: null,
  // driversHistory : null
};

const DriverBookingSlice = createSlice({
  name: 'DriverBooking',
  initialState,
  reducers: {
    // addNewBooking: (state, data) => {
    //   if (
    //     state.newBooking.filter(booking => booking.id === data.payload.id)[0]
    //   ) {
    //   } else {
    //     state.newBooking.push(data.payload);
    //   }
    // },
    setBooking: (state, data)=>{
      state.newBooking = data.payload
    }
  },
});
const DriverBookingReducer = DriverBookingSlice.reducer;
export default DriverBookingReducer;
export const DriverBookingActions = DriverBookingSlice.actions;
