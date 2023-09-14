import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const setLoading = createAsyncThunk("setLoading", (data) => data);

export const GlobalSlice = createSlice({
  name: "global",
  initialState: {
    isLoading: false,
  },
  extraReducers: (builder) => {
    builder.addCase(setLoading.fulfilled, (state, action) => {
      state.isLoading = action.payload;
    });
  },
});

export default GlobalSlice.reducer;
