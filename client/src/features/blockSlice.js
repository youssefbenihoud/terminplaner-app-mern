import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

export const fetchBlocks = createAsyncThunk(
  'blocks/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/blocks');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createBlock = createAsyncThunk(
    'blocks/create',
    async (blockData, { rejectWithValue }) => {
      try {
        const response = await api.post('/blocks', blockData);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

const blockSlice = createSlice({
  name: 'blocks',
  initialState: {
    blocks: [],
    status: 'idle',
    error: null
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlocks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlocks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.blocks = action.payload;
      })
      .addCase(createBlock.fulfilled, (state, action) => {
        state.blocks.push(action.payload);
      })
      .addCase(fetchBlocks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message;
      });
  }
});

export default blockSlice.reducer;