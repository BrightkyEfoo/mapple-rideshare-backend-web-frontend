import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  content: '',
  isVisible: false,
  actions: null,
  notifications: null,
  isRateVisible : false
};

const NotificationSlice = createSlice({
  name: 'Notification',
  initialState,
  reducers: {
    setContent: (state, data) => {
      state.content = data.payload;
    },
    setIsVisible: (state, data) => {
      state.isVisible = data.payload;
    },
    setIsRateVisible: (state, data) => {
      state.isRateVisible = data.payload;
    },
    setActions: (state, data) => {
      state.actions = data.payload;
    },
    clear: state => {
      state.actions = null;
      state.content = '';
      state.isVisible = false;
    },
    setNotifications: (state, data) => {
      state.notifications = data.payload;
    },
  },
});
const NotificationReducer = NotificationSlice.reducer;
export default NotificationReducer;
export const NotificationActions = NotificationSlice.actions;
