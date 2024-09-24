import { configureStore } from '@reduxjs/toolkit';
import fileSlice from '../slices/fileSlice';

const store = configureStore({
  reducer: {
    file: fileSlice
  },
});

export default store;