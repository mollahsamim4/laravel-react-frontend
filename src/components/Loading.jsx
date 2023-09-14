import React from "react";

function Loading() {
  return (
    <div className="w-scren h-screen bg-zinc-900 bg-opacity-70  z-50 top-0  fixed w-full grid place-items-center overflow-hidden">
      <div className=" bg-opacity-60 w-full  p-4 flex justify-center items-center rounded-sm">
        <span className="loader backdrop-blur-xl bg-gray-800 w-full"></span>
      </div>
    </div>
  );
}

export default Loading;
