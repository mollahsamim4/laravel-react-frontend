import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

function AuthGuard() {
  const navigate = useNavigate();
  let user = useSelector((state) => state.user);
  useEffect(() => {
    if (!user.isAuthenticated) {
      navigate("/login");
    }
  }, [user]);
  return user.isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default AuthGuard;
