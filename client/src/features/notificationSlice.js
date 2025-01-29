import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    list: [],
    unread: 0
  },
  reducers: {
    addNotification: (state, action) => {
      state.list.unshift(action.payload);
      state.unread += 1;
    },
    markAsRead: (state) => {
      state.unread = 0;
    }
  }
});

export const { addNotification, markAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;