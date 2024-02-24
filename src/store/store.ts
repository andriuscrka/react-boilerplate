import { configureStore } from '@reduxjs/toolkit';
import templateReducer from './slices/feature/templateSlice';

export const store = configureStore({
  reducer: {
    template: templateReducer,
  },
});