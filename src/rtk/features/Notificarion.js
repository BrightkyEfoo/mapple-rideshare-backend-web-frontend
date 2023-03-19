import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  contents: [{ value: '', status: '', severity: 'info' }],
  isVisible: false,
  actions: null,
  onClose: '',
  notifications: null,
  data: null,
  Rate: {
    isVisible: false,
    bookingId: null,
  },
};

const NotificationSlice = createSlice({
  name: 'Notification',
  initialState,
  reducers: {
    setContent: (state, data) => {
      state.contents = data.payload;
    },
    addContent: (state, data) => {
      let prev = [...state.contents];
      prev = prev.filter(el => el.value !== '');
      if (!prev.filter(el => el.value === data.payload.value)[0]) {
        prev.push(data.payload);
        state.contents = prev;
      }
    },
    removeContent: (state, data) => {
      let prev = [...state.contents];
      prev = prev.filter(el => el.value !== data.payload.value);
      state.contents = prev;
    },
    setIsVisible: (state, data) => {
      if (!data.payload) {
        state.contents = [{ value: '', status: '', severity: 'info' }];
      }
      state.isVisible = data.payload;
    },
    setRate: (state, data) => {
      state.Rate = data.payload;
    },
    setData: (state, data) => {
      state.data = data.payload;
    },
    setActions: (state, data) => {
      state.actions = data.payload;
    },

    setOnClose: (state, data) => {
      state.onClose = data.payload;
    },
    // clear: state => {
    //   state.actions = null;
    //   state.content = '';
    //   state.isVisible = false;
    // },
    setNotifications: (state, data) => {
      state.notifications = data.payload;
    },
    addNotification: (state, data) => {
      if (!state.notifications.filter(el => el.id === data.payload.id)[0]) {
        let prev = state.notifications;
        prev.push(data.payload);
        state.notifications = prev;
      }
    },
  },
});
const NotificationReducer = NotificationSlice.reducer;
export default NotificationReducer;
export const NotificationActions = NotificationSlice.actions;
