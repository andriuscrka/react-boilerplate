import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 'initialValue',
};

export const templateSlice = createSlice({
  name: 'template',
  initialState,
  reducers: {
    action: (state) => {
      state.value = 'newValue';
    },
    actionWithValue: (state, action) => {
      state.value = action.payload;
    },
    actionWithPrepare: {
      reducer(state, action) {
        state.value = action.payload;
      },
      prepare(value) {
        // Optional, but it lets you modify the payload and any meta data associated with the action
        return { payload: value /*some method or etc.*/, meta: null, error: null };
      },
    }
  },
});

export const { action } = templateSlice.actions;

export default templateSlice.reducer;