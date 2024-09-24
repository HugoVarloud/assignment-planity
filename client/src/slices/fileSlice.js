import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const uploadFileThunk = createAsyncThunk(
  'file/uploadFile',
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${import.meta.env.VITE_API_PATH}/files/uploads`, formData, {
        responseType: 'blob',
      });

      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error uploading file');
    }
  }
);

const fileSlice = createSlice({
  name: 'file',
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearFileState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(uploadFileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload;
      })
      .addCase(uploadFileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'File upload failed';
      });
  },
});

export const { clearFileState } = fileSlice.actions;
export default fileSlice.reducer;