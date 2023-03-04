import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  isVisible: false,
  position: 0,
  type: '',
  canBack: true,
};

const RiderLoginFormSlice = createSlice({
  name: 'RiderLoginForm',
  initialState,
  reducers: {
    goForward: state => {
      state.position = state.position === 2 ? 2 : state.position + 1;
    },
    goBack: state => {
      state.position = state.position === 0 ? 0 : state.position - 1;
    },
    setPosition: (state, data) => {
      state.position = data.payload;
    },
    setType: (state, data) => {
      if (!['rider', 'driver'].includes(data.payload)) {
        console.log('error type rider/driver only');
      } else {
        state.type = data.payload;
      }
    },

    setIsVisible: (state, data) => {
      state.isVisible = data.payload;
    },
    setCanBack: (state, data) => {
      state.isVisible = data.payload;
    },
  },
});
const RiderLoginFormReducer = RiderLoginFormSlice.reducer;
export default RiderLoginFormReducer;
export const RiderLoginFormActions = RiderLoginFormSlice.actions;
