import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../../components/Card";
import { setLoading } from "../../store/GlobalSlice";
import { fetchCategories } from "../../store/posts/Category/CategorySlice";
import { updatePost } from "../../store/posts/PostsSlice";

function Edit() {
  const [postData, setPostData] = useState("");
  const [categoryField, setCategoryField] = useState();

  const posts = useSelector((state) => state.posts);
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    let filterPost = posts.posts.data
      .filter((item) => item.id == params.id)
      .map(({ title, body, categories }) => {
        let selectedPropert = { title, body, categories };
        return selectedPropert;
      });

    setPostData(filterPost[0]);

    console.log(postData);
  }, []);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const changeHandler = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  console.log(posts.posts.data);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updatePost({
        id: params.id,
        payload: { ...postData, category: categoryField },
      })
    );
    navigate("/posts");
  };

  useEffect(() => {
    posts.isLoading ? dispatch(setLoading(true)) : dispatch(setLoading(false));
  }, [posts.isLoading]);
  return (
    <Card header_text="Edit posts" icon={<FaEdit />} className="">
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
            value={postData?.title ?? ""}
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
            value={postData?.body ?? ""}
          />
        </div>

        <div className="form-group mb-2">
          {postData?.categories?.length != 0 ? (
            <select
              className="w-full p-2 rounded-md font-openSans font-semibold outline-none focus:ring-2 ring-green-800 ring-opacity-50"
              name="category"
              onChange={(e) => setCategoryField(e.target.value)}
            >
              {category.categories.map((item) => {
                return (
                  <option
                    key={item.id}
                    value={item.id}
                    className="font-openSans"
                    selected={item.name == [postData.categories?.[0].name]}
                  >
                    {item.name}
                  </option>
                );
              })}
            </select>
          ) : (
            <select
              className="w-full p-2 rounded-md font-openSans font-semibold outline-none focus:ring-2 ring-green-800 ring-opacity-50"
              name="category"
              onChange={(e) => setCategoryField(e.target.value)}
            >
              {category.categories.map((item) => {
                return (
                  <option
                    key={item.id}
                    value={item.id}
                    className="font-openSans"
                    selected={item.name == [postData.categories?.[0].name]}
                  >
                    {item.name}
                  </option>
                );
              })}
            </select>
          )}
        </div>

        <div className="form-group flex justify-center">
          <button
            onClick={handleSubmit}
            type="submit"
            className="bg-gradient-to-r from-indigo-500 to-indigo-700 px-6 py-2 rounded-sm text-gray-100 font-semibold"
          >
            Update
          </button>
        </div>
      </form>
    </Card>
  );
}

export default Edit;
