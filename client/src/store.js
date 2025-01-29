import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import blockReducer from './features/blockSlice';
import notificationReducer from './features/notificationSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    //appointments: appointmentReducer,
    blocks: blockReducer,
    notifications: notificationReducer
  }
});