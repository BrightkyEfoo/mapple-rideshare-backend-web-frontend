import { createSlice } from '@reduxjs/toolkit';

// navigator.geolocation.getCurrentPosition()

const initialState = {
  position: 0,
  drivers: null,
  route: {
    start: '',
    end: '',
  },
  price: 0,
  startCoord: {
    lat: 0,
    lng: 0,
  },
  endCoord: {
    lat: 0,
    lng: 0,
  },
  startLongName: '',
  centerCoord: {
    lat: 45.396,
    lng: -75.7,
  },
  selectedDriver: null,
  isDriversVisible: false,
  actualBooking: null,
  history: null,
  isPaymentDisplay: false,
};

const BookRideSlice = createSlice({
  name: 'BookRide',
  initialState,
  reducers: {
    goForward: state => {
      state.position = state.position + 1;
    },
    setDrivers: (state, data) => {
      state.drivers = data.payload;
    },
    goBackward: state => {
      state.position = state.position - 1;
    },
    setRoute: (state, data) => {
      state.route.start = data.payload.start;
      state.route.end = data.payload.end;
      state.startLongName = data.payload.startLongName;
    },
    setPosition: (state, data) => {
      state.position = data.payload;
    },
    setSelectedDriver: (state, data) => {
      state.selectedDriver = data.payload;
    },
    setDriversVisible: (state, data) => {
      state.isDriversVisible = data.payload;
    },
    setActualBooking: (state, data) => {
      state.actualBooking = data.payload;
    },
    setHistory: (state, data) => {
      state.history = data.payload;
    },
    setIsPaymentDisplay: (state, data) => {
      state.isPaymentDisplay = data.payload;
    },
    setStartCoord: (state, data) => {
      state.centerCoord = data.payload;
      state.startCoord = data.payload;
    },
    setEndCoord: (state, data) => {
      state.endCoord = data.payload;
      state.centerCoord = data.payload;
    },
    setCenterCoord: (state, data) => {
      state.centerCoord = data.payload;
    },
    setPrice: (state, data) => {
      state.price = data.payload;
    },
  },
});
const BookRideReducer = BookRideSlice.reducer;
export default BookRideReducer;
export const BookRideActions = BookRideSlice.actions;
