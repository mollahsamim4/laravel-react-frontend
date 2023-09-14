import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "../../config/axios.config";

// create action

export const createPost = createAsyncThunk(
  "createPost",
  async (data, { rejectWithValue }) => {
    try {
      console.log(data);
      const response = await axios.post("/api/posts", data);
      const result = await response;
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// fetch posts action

export const getAllPosts = createAsyncThunk(
  "getAllPosts",
  async (data, { rejectWithValue }) => {
    try {
      let response = await axios.get("/api/posts");

      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
export const fetchCustomNumberOfPosts = createAsyncThunk(
  "fetchCustomNumberOfPosts",
  async (payload, { rejectWithValue }) => {
    try {
      let response = await axios.get(
        `api/getPostsByCustomNumber/${payload.count}/${payload.lastId}`
      );
      let results = await response;
      console.log(results);
      return results;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// update posts action

export const updatePost = createAsyncThunk(
  "updatePost",
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      let response = await axios.put(`api/posts/${data.id}`, data.payload);
      return response;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// delete post action

export const deletePost = createAsyncThunk(
  "deletePost",
  async (data, { rejectWithValue }) => {
    const { id, payload } = data;
    console.log("Delete post", data);
    try {
      let response = await axios.delete(
        `api/posts/${id}/${JSON.stringify(payload)}`
      );
      return { id, response };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const PostsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    filterPosts: [],
    lastIdOfPost: 1,
    isLoading: false,
    error: null,
    lastPost: false,
    meta: [],
  },
  reducers: {
    filterPosts: (state, action) => {
      state.filterPosts.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    // create posts
    builder
      .addCase(createPost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        // console.log(action.payload.data.post);
        state.posts.data.push([action.payload.data.post]);
        toast.success(action.payload.message);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    //   fetch data sand save to state

    builder
      .addCase(getAllPosts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
        state.posts = action.payload.data;
        state.filterPosts = state.posts;
        state.meta = action.payload.meta;
        state.lastIdOfPost =
          state.posts ?? state.posts[state.posts.length - 1].id;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.response;
        console.log(action.payload);
        state.error ? toast.error(state.error?.data?.message) : "";
      });

    // fetch post by number
    builder
      .addCase(fetchCustomNumberOfPosts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchCustomNumberOfPosts.fulfilled, (state, action) => {
        state.isLoading = false;

        state.lastPost = action.payload.data.length == 0 ? true : false;
        console.log(action.payload);
        state.posts.push(action.payload.data);
        state.lastIdOfPost = state.posts[state.posts.length - 1].id;
      })
      .addCase(fetchCustomNumberOfPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;

        state.error ? toast.error(state.error.message) : "";
      });
    //   update post data

    builder
      .addCase(updatePost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.success("Update success");
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    //   delete post
    builder
      .addCase(deletePost.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts.data = state.posts.data.filter(
          (item) => item.id !== action.payload.id
        );
        state.filterPosts.data = state.posts.data.filter(
          (item) => item.id !== action.payload.id
        );
        let message = action.payload.response.data?.message ?? "";
        message ? toast.success(message) : "";
        console.log(action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { filterPosts } = PostsSlice.actions;

export default PostsSlice.reducer;
