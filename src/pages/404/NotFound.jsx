import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="w-screnn h-screen overflow-hidden grid place-content-center">
      <h3 className="text-red-800 font-lato font-3xl font-semibold">
        Not Found{" "}
        <Link
          to="/"
          className="mx-4 bg-gradient-to-r from-indigo-600 to-green-800 px-4 py-3 text-gray-200 rounded-md font-medium"
        >
          Go to home
        </Link>
      </h3>
    </div>
  );
}

export default NotFound;
