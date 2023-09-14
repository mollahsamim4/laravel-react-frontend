import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function UnAuthGuard({ component }) {
  const user = useSelector((state) => state.user);

  return !user.isAuthenticated ? <Outlet /> : <Navigate to="/posts" />;
}

export default UnAuthGuard;
