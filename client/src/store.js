import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import blockReducer from './features/blockSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    //appointments: appointmentReducer,
    blocks: blockReducer // Füge dies hinzu
  }
});