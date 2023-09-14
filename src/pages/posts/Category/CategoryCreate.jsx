import React, { useEffect, useState } from "react";
import { MdCreateNewFolder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../../../components/Card";
import StatusMessage from "../../../components/StatusMessage";
import { setLoading } from "../../../store/GlobalSlice";
import { createCategory } from "../../../store/posts/Category/CategorySlice";
const CategoryCreate = () => {
  const [categoryField, setCategoryField] = useState("");
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCategory({ name: categoryField }));
    setCategoryField("");
    navigate("/posts/category");
  };

  useEffect(() => {
    category.isLoading
      ? dispatch(setLoading(true))
      : dispatch(setLoading(false));
  }, [category.isLoading]);
  return (
    <Card header_text="Create category" icon={<MdCreateNewFolder />}>
      <form
        className="card md:w-6/12 mx-auto bg-gray-300 bg-opacity-50 p-2"
        method="post"
        onSubmit={handleSubmit}
      >
        {category.message ? <StatusMessage text={category.message} /> : ""}
        <div className="form-group mb-2">
          <label htmlFor="name" className="font-lato font-semibold py-2 block">
            Name :
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your category name..."
            className="w-full px-4 py-2 outline-none focus:ring-2 ring-emerald-700 font-lato font-semibold rounded-md"
            value={categoryField}
            onChange={(e) => setCategoryField(e.target.value)}
          />
        </div>

        <div className="form-group flex justify-center">
          <button
            onClick={handleSubmit}
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-indigo-700 px-6 py-2 rounded-sm text-gray-100 font-semibold"
          >
            Create
          </button>
        </div>
      </form>
    </Card>
  );
};

export default CategoryCreate;
