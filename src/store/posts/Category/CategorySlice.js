import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../../../config/axios.config";
import { csrf } from "../../../config/csrf";
// category create action

export const createCategory = createAsyncThunk(
  "createCategory",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      await csrf();
      const response = await axios.post("/category", data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCategories = createAsyncThunk(
  "fetchCategories",
  async (data, { rejectWithValue }) => {
    try {
      await csrf();
      const response = await axios.get("category");
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "delteCategory",
  async (id, { rejectWithValue }) => {
    try {
      await csrf();
      const response = await axios.delete(`/category/${id}`);
      return { id, response };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const CategorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    isLoading: false,
    error: null,
    status: null,
    message: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories.push(action.payload?.data?.data);
        console.log(action.payload);
        state.message = action.payload?.data?.message ?? null;
        state.message ? toast.success(state.message) : "";
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.error = action.payload.response.errors;
        state.message = action.payload?.response?.data?.message ?? null;
        state.message ? toast.error(state.message) : "";
      });

    //   fetch all posts

    builder
      .addCase(fetchCategories.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = action.payload?.data ?? [];
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.response.errors;
        state.message = action.payload?.response?.data?.message ?? null;
        state.message ? toast.error(state.message) : "";
      });

    // delete category

    builder
      .addCase(deleteCategory.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload.response?.data?.message ?? null;
        state.categories = state.categories.filter(
          (category) => category.id !== action.payload.id
        );
        state.message ? toast.success(state.message) : "";
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.response.data.errors;
      });
  },
});

export default CategorySlice.reducer;
