import { configureStore } from '@reduxjs/toolkit';

import templateReducer from './slices/feature/templateSlice';
import asyncTemplateReducer from './slices/featureWithAsync/asyncTemplateSlice';

export const store = configureStore({
  reducer: {
    template: templateReducer,
    asyncTemplate: asyncTemplateReducer,
  },
});