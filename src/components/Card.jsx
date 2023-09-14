import React from "react";

function Card({ header_text, children, icon, className }) {
  return (
    <div className={`card bg-gray-200 min-h-screen py-1 px-1 ${className}`}>
      <div className="card_header bg-gray-100 p-2">
        <h2 className=" font-lato font-semibold text-green-800 flex items-center gap-x-2">
          {icon ? icon : ""} {header_text}
        </h2>
      </div>
      <div className="card-body p-2 md:p-8">{children}</div>
    </div>
  );
}

export default Card;
