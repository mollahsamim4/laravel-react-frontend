import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import Navigation from "./Navigation/Navigation";
import Loading from "./components/Loading";
import Router from "./routes/Router";
import { fetchUser, userIsAuhtenticated } from "./store/user/UserSlice";
function App() {
  const global = useSelector((state) => state.global);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    user.isAuthenticated ? dispatch(fetchUser()) : "";
  }, [user.isAuthenticated]);

  useEffect(() => {
    console.log("user is authenticated use effect fired");
    dispatch(userIsAuhtenticated());
  }, []);

  return (
    <>
      <Navigation />
      <ToastContainer autoClose={2000} />
      {global.isLoading ? <Loading /> : ""}
      <Router />
    </>
  );
}

export default App;
