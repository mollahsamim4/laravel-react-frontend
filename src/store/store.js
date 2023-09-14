import { configureStore } from "@reduxjs/toolkit";
import GlobalSlice from "./GlobalSlice";
import CategorySlice from "./posts/Category/CategorySlice";
import PostsSlice from "./posts/PostsSlice";
import UserSlice from "./user/UserSlice";

const customMiddleware = (store) => (next) => (action) => {
  console.log(store.getState());
};

export const store = configureStore({
  reducer: {
    user: UserSlice,
    global: GlobalSlice,
    posts: PostsSlice,
    category: CategorySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // middleware: customMiddleware,
});
