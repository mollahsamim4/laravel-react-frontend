import React, { Fragment, useCallback, useEffect, useState } from "react";
import { MdCreateNewFolder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Card from "../../components/Card";
import { fetchCategories } from "../../store/posts/Category/CategorySlice";
import { createPost } from "../../store/posts/PostsSlice";
let defaultPost = { title: "", body: "" };
function Create() {
  const [postData, setPostData] = useState(defaultPost);
  const [categoryField, setCategoryField] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const posts = useSelector((state) => state.posts);
  const category = useSelector((state) => state.category);

  const changeHandler = useCallback((e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  });

  // useEffect(() => {
  //   if (posts.isLoading) {
  //     dispatch(setLoading(true));
  //   } else {
  //     dispatch(setLoading(false));
  //   }
  // }, [posts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (postData.title.length < 1 && postData.body.length < 1) {
      toast.warn("Input field must not be empty");
      return;
    }

    dispatch(createPost({ ...postData, category: categoryField }));
    setPostData(defaultPost);

    navigate("/posts");
  };

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  return (
    <Card
      header_text="Create posts"
      icon={<MdCreateNewFolder className="text-2xl" />}
    >
      <form
        className="card md:w-6/12 mx-auto bg-gray-300 bg-opacity-50 p-2"
        method="post"
        onSubmit={handleSubmit}
      >
        <div className="form-group mb-2">
          <label htmlFor="title" className="font-lato font-semibold py-2 block">
            Title :
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter your title here..."
            className="w-full px-4 py-2 outline-none focus:ring-2 ring-emerald-700 font-lato font-semibold rounded-md"
            value={postData.title}
            onChange={changeHandler}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="body" className="font-lato font-semibold py-2 block">
            Body :
          </label>
          <textarea
            type="text"
            name="body"
            id="body"
            placeholder="Enter your body here..."
            className="w-full px-4 py-2 outline-none focus:ring-2 ring-emerald-700 font-lato font-semibold rounded-md"
            rows="7"
            onChange={changeHandler}
            value={postData.body}
          />
        </div>

        <div className="form-group mb-2">
          {category?.categories.length !== 0 ? (
            <select
              className="w-full p-2 rounded-md font-openSans font-semibold outline-none focus:ring-2 ring-green-800 ring-opacity-50"
              name="category"
              onChange={(e) => setCategoryField(e.target.value)}
            >
              <option value="" defaultValue="">
                {" "}
                Please select category
              </option>
              {category.categories.map((item) => {
                return (
                  <Fragment>
                    <option
                      key={item.id}
                      value={item.id}
                      className="font-openSans"
                    >
                      {item.name}
                    </option>
                  </Fragment>
                );
              })}
            </select>
          ) : (
            ""
          )}
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
}

export default Create;
