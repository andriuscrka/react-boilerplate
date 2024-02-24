import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  values: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const PLACEHOLDER_URL = 'https://jsonplaceholder.typicode.com/posts';

export const fetchAsync = createAsyncThunk('asyncTemplate/fetchAsync', async () => {
  try {
    const response = await axios.get(PLACEHOLDER_URL);
    return response.data;
  } catch(err) {
    return err.message;
  }
});

export const asyncTemplateSlice = createSlice({
  name: 'asyncTemplate',
  initialState,
  reducers: {
    action: (state) => {
      state.values.push('defaultValue');
    },
    actionWithValue: (state, action) => {
      state.values.push(action.payload);
    },
    actionWithPrepare: {
      reducer(state, action) {
        state.values.push(action.payload);
      },
      prepare(value) {
        // Optional, but it lets you modify the payload and any meta data associated with the action
        return { payload: value /*some method or etc.*/, meta: null, error: null };
      },
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.values = action.payload;
      })
      .addCase(fetchAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  
  }
});

// Undescriptive method names for the sake of example
export const getValues = (state) => state.asyncTemplate.values;
export const getStatus = (state) => state.asyncTemplate.status;
export const getError = (state) => state.asyncTemplate.error;

export const { action, actionWithValue, actionWithPrepare } = asyncTemplateSlice.actions;

export default asyncTemplateSlice.reducer;