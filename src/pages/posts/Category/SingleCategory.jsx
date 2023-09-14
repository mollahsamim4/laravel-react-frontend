import React from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { deleteCategory } from "../../../store/posts/Category/CategorySlice";

const SingleCategory = ({ categoryItem }) => {
  const { name, id } = categoryItem;
  const dispatch = useDispatch();
  const clickHandler = (e) => {
    Swal.fire({
      icon: "warning",
      text: "Are you sure",
      customClass: "font-openSans font-semibold",
      confirmButtonText: "Delete",
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: "Cancel",
    }).then((event) => {
      if (event.isConfirmed) {
        dispatch(deleteCategory(id));
      }
    });
  };
  return (
    <li className="bg-zinc-400 px-2 py-2 rounded-md shadow-md flex items-center justify-between gap-x-4 gap-y-2">
      {name}{" "}
      <FaTimes className="text-red-800 cursor-pointer" onClick={clickHandler} />
    </li>
  );
};

export default SingleCategory;
