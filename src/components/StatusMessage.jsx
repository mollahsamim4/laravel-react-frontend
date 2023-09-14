import React from "react";

const StatusMessage = ({ text }) => {
  return (
    <div className="text-green-800 font-openSans font-semibold text-center my-2">
      {text}
    </div>
  );
};

export default StatusMessage;
