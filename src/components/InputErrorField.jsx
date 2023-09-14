import React from "react";

function InputErrorField({ text }) {
  return (
    <div className="block my-2">
      <span className="text-orange-800 font-semibold font-lato">{text}</span>
    </div>
  );
}

export default InputErrorField;
