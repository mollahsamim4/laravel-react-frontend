import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthGuard from "../auth/AuthGuard";
import UnAuthGuard from "../auth/UnAuthGuard";
import NotFound from "../pages/404/NotFound";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProfileIndex from "../pages/Profile/ProfileIndex";
import { default as ForegetPassword } from "../pages/Profile/user/ForegetPassword";
import PassswordReset from "../pages/Profile/user/PassswordReset";
import SignUp from "../pages/SignUp";
import AllPosts from "../pages/posts/AllPosts";
import Categories from "../pages/posts/Category/Categories";
import CategoryCreate from "../pages/posts/Category/CategoryCreate";
import Create from "../pages/posts/Create";
import Edit from "../pages/posts/Edit";
import Index from "../pages/posts/Index";
function Router() {
  return (
    <>
      <Routes>
        <Route element={<AuthGuard />}>
          <Route path="/" index element={<Home />} />
          <Route path="/posts" element={<Index />}>
            <Route index element={<AllPosts />} />
            <Route path="create" element={<Create />} />
            <Route path="edit/:id" element={<Edit />} />
            <Route path="category" element={<Categories />} />
            <Route path="category/create" element={<CategoryCreate />} />
          </Route>
        </Route>
        <Route element={<UnAuthGuard />}>
          <Route path="/profile" element={<ProfileIndex />}>
            <Route path="forget-password" element={<ForegetPassword />} />
          </Route>
          <Route path="password-reset/:token" element={<PassswordReset />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default Router;
