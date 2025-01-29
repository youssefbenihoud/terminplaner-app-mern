import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

export const fetchAppointments = createAsyncThunk(
  'appointments/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/appointments');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const acceptAppointment = createAsyncThunk(
  'appointments/accept',
  async (appointmentId, { rejectWithValue }) => {
    try {
      const response = await api.put(`/appointments/${appointmentId}/accept`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const declineAppointment = createAsyncThunk(
  'appointments/decline',
  async ({ appointmentId, reason }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/appointments/${appointmentId}/decline`, { reason });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppointments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAppointments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.appointments = action.payload;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.appointments.push(action.payload);
      })
      .addCase(fetchAppointments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message || 'Fehler beim Laden der Termine';
      })
      .addCase(acceptAppointment.fulfilled, (state, action) => {
        const index = state.appointments.findIndex(a => a._id === action.payload._id);
        state.appointments[index] = action.payload;
      })
      .addCase(declineAppointment.fulfilled, (state, action) => {
        const index = state.appointments.findIndex(a => a._id === action.payload._id);
        state.appointments[index] = action.payload;
      });
  }
});

export const createAppointment = createAsyncThunk(
  'appointments/create',
  async (appointmentData, { rejectWithValue }) => {
    try {
      const response = await api.post('/appointments', appointmentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export default appointmentSlice.reducer;