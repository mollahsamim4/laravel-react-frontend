import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../../config/axios.config";
import { csrf } from "../../config/csrf";

// get csrf token

// check user is authenticated or not

export const userIsAuhtenticated = createAsyncThunk(
  "userIsAuhtenticated",
  async (data, { rejectWithValue }) => {
    try {
      await csrf();
      const response = await axios.get("/api/check-user-is-authenticated");
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// action
export const fetchUser = createAsyncThunk(
  "fetchUser",
  async (token, { rejectWithValue }) => {
    try {
      await csrf();
      let response = await axios.get("/api/user");
      let result = await response;
      return result;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "register",
  async (data, { rejectWithValue }) => {
    try {
      await csrf();
      const response = axios.post("/register", data);
      let result = await response;
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// login user action

export const login = createAsyncThunk(
  "login",
  async (payload, { rejectWithValue }) => {
    try {
      await csrf();
      const response = await axios.post("/login", payload);

      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// logout user action

export const logout = createAsyncThunk(
  "logout",
  async (data, { rejectWithValue }) => {
    try {
      await csrf();
      const response = await axios.post("/logout");
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// password reset action

export const forgetPassword = createAsyncThunk(
  "forgetPassword",
  async (data, { rejectWithValue }) => {
    try {
      await csrf();
      const response = await axios.post("/forgot-password", data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// reset password
export const resetPassword = createAsyncThunk(
  "resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/reset-password", data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
    isLoading: false,
    error: null,
    isAuthenticated: false,
    status: null,
  },
  reducers: {
    setUser: async (state, action) => {
      state.user = action.payload;
    },
    getUser: (state) => {
      return state.user;
    },
  },

  extraReducers: (builder) => {
    // check user is authenticated or not
    builder
      .addCase(userIsAuhtenticated.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(userIsAuhtenticated.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.data.status) {
          state.isAuthenticated = true;
        } else {
          state.isAuthenticated = false;
        }
      })
      .addCase(userIsAuhtenticated.rejected, (state, action) => {
        console.log("rejected state");
        state.isLoading = false;
        state.error = action.payload?.response?.data?.errors ?? null;
      });
    // fetch user
    builder.addCase(fetchUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      console.log(action.payload);
      state.user = action.payload.data;
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      toast.error(action.payload);
      state.error = action.payload;
    });

    // forget password

    builder
      .addCase(forgetPassword.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload.data?.status ?? null;
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.status = action.payload?.response?.data?.message ?? null;
      });

    // Reset password

    builder
      .addCase(resetPassword.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload.data?.status ?? null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.response?.data;
        let message = action.payload?.response?.data?.message ?? null;
        message ? toast.error(message) : "";
      });

    // register user

    builder
      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        toast.success("User Registered");

        let message = action.payload?.results?.message ?? null;

        console.log(action.payload);

        message ? toast.success(message) : "";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload.message);
      });

    // login user
    builder
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.user = action.payload?.user ?? [];

        let isAuthenticated = state.user ? true : false;
        state.isAuthenticated = isAuthenticated;

        let message = action.payload?.response?.data?.message ?? null;
        message ? toast.success(message) : "";
        console.log(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        console.log("Rejected", action.payload);
        state.error = action.payload.response.data;
        toast.error(state.error.message);
      });

    // logout user

    builder
      .addCase(logout.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = [];
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setUser, getUser } = UserSlice.actions;

export default UserSlice.reducer;
