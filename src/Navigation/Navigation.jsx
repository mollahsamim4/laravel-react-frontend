import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store/user/UserSlice";
function Navigation() {
  const dispatch = useDispatch();
  const [auth, setAuth] = useState(false);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user.isAuthenticated) {
      setAuth(true);
    } else {
      setAuth(false);
    }
  }, [user.isAuthenticated, auth]);
  return (
    <nav
      className={`bg-gradient-to-r ${
        auth
          ? "from-green-600 to-green-800 flex items-center justify-between"
          : "from-blue-500 to-purple-400"
      } flex items-center justify-end px-4`}
    >
      {auth ? (
        <ul className="flex gap-x-2">
          <li>
            <Link to="/">Logo</Link>
          </li>
        </ul>
      ) : (
        ""
      )}

      <ul className="p-3 flex gap-x-2 justify-center justify-self-end">
        {auth ? (
          <Fragment>
            <li>
              <Link to="/" className="text-gray-100 font-lato font-medium ">
                Home
              </Link>
            </li>
            <li>
              <Link to="/posts" className="text-gray-100 font-lato font-medium">
                Posts
              </Link>
            </li>
            <li>
              <Link
                onClick={() => dispatch(logout())}
                className="text-gray-100 font-lato font-medium"
              >
                Logout
              </Link>
            </li>
          </Fragment>
        ) : (
          <Fragment>
            <li>
              <Link
                to="/signUp"
                className="text-gray-100 font-lato font-medium"
              >
                Sign Up
              </Link>
            </li>
            <li>
              <Link to="/login" className="text-gray-100 font-lato font-medium">
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="text-gray-100 font-lato font-medium"
              >
                Profile
              </Link>
            </li>
          </Fragment>
        )}
      </ul>
    </nav>
  );
}

export default Navigation;
