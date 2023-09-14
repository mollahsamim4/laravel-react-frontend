import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import SinglePost from "../../components/posts/SinglePost";
import { setLoading } from "../../store/GlobalSlice";
import { deletePost, getAllPosts } from "../../store/posts/PostsSlice";

import Filter from "../../components/Filter";

function AllPosts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const user = useSelector((state) => state.user);
  const [showPopup, setShowPopup] = useState(false);
  const [singlePostId, setSinglePostId] = useState(null);
  const [categories, setCategories] = useState(null);

  const navigate = useNavigate();

  const [position, setPosition] = useState();

  const btnRef = useRef(null);

  useEffect(() => {
    posts.isLoading ? dispatch(setLoading(true)) : dispatch(setLoading(false));
  }, [posts.isLoading]);

  const fetchAllUserCached = useCallback(() => {
    dispatch(getAllPosts());
  });

  useEffect(() => {
    fetchAllUserCached();
  }, []);

  const handlePopupClick = (id, ref, categories) => {
    setSinglePostId(id);
    let categoriesId = categories.map((item) => item.id);
    setCategories(categoriesId);
    let elementPosition = ref.current.getBoundingClientRect();
    let newPosition = {
      ...elementPosition,
      offsetHeight: ref.current.offsetHeight,
    };

    let showElementBox = ref.current;

    document.body.addEventListener("click", function (event) {
      if (showElementBox.contains(event.target)) {
        setShowPopup(!showPopup);
      } else {
        setShowPopup(false);
      }
    });

    setPosition({
      elementPosition,
      offsetHeight: ref.current.offsetHeight,
    });
  };

  useEffect(() => {
    // console.log(position);
  }, [position]);

  //   delete post

  const deletePostHandler = (id, category) => {
    Swal.fire({
      icon: "warning",
      text: "Are you sure to delete",
      confirmButtonText: "Delete",
      showConfirmButton: true,
      showDenyButton: true,
    }).then((event) => {
      if (event.isConfirmed) {
        dispatch(deletePost({ id, payload: { category } }));
      } else {
        toast.success("Your data is safe!");
      }
    });
  };

  const options = {
    threshold: 1,
  };

  // useEffect(() => {
  //   const observer = new IntersectionObserver((row) => {
  //     row.forEach((item) => {
  //       if (item.target === btnRef.current?.childNodes[0]) {
  //         console.log("This is first element", item.target);
  //       }

  //       if (
  //         item.isIntersecting &&
  //         item.target ===
  //           btnRef.current?.childNodes[btnRef.current.childNodes.length - 1]
  //       ) {
  //         if (!posts.lastPost) {
  //           dispatch(
  //             fetchCustomNumberOfPosts({ count: 1, lastId: posts.lastIdOfPost })
  //           );
  //         }
  //       }
  //     });
  //   }, options);

  //   if (btnRef.current?.childNodes) {
  //     btnRef.current?.childNodes.forEach((child) => {
  //       observer.observe(child);
  //     });
  //   }

  //   return () => {
  //     if (btnRef.current?.childNodes) {
  //       btnRef.current.childNodes.forEach((child) => {
  //         observer.unobserve(child);
  //       });
  //     }
  //   };
  // }, [btnRef, options]);

  const filterPostsHandler = (data) => {
    // dispatch(filterPosts(data));
  };

  return (
    <div className="w-full">
      {posts.posts.data ? (
        <div className="filterContainer  flex flex-wrap justify-center w-full gap-x-2 bg-zinc-300">
          <Filter
            placeholder="Posts filter by title..."
            searchInData={posts.posts.data}
            searchPropertyInData="title"
            filterHandler={filterPostsHandler}
            isFilterByNetestedPropert={false}
            filterNestedProperty="categories"
            label="Filter by title"
          />
          <Filter
            placeholder="Posts filter by category..."
            label="Filter by category"
            searchInData={posts.posts.data}
            searchPropertyInData="name"
            filterHandler={filterPostsHandler}
            isFilterByNetestedPropert={true}
            filterNestedProperty="categories"
          />
        </div>
      ) : (
        ""
      )}
      {posts.filterPosts?.data?.length > 0 ? (
        <table className=" border-slate-500 w-full posts_table overflow-x-auto">
          <thead className="bg-gradient-to-r from-indigo-400 to-indigo-500">
            <tr className=" border-slate-500">
              <th className="border-r border-none border-slate-500 px-4 py-2 font-lato text-gray-900">
                Action
              </th>
              <th className="border-r border-none border-slate-500 px-4 py-2 font-lato text-gray-900">
                Id
              </th>

              <th className="border-r border-none border-slate-500 px-4 py-2 font-lato text-gray-900">
                Title
              </th>
              <th className="border-r border-none border-slate-500 px-4 py-2 font-lato text-gray-900">
                Body
              </th>
              <th className="border-r border-none border-slate-500 px-4 py-2 font-lato text-gray-900">
                Category
              </th>
              <th className="border-r border-none border-slate-500 px-4 py-2 font-lato text-gray-900 whitespace-nowrap">
                created by
              </th>
              <th className="px-4 py-2 font-lato text-gray-900 whitespace-nowrap">
                created date
              </th>
              <th className="px-4 py-2 font-lato text-gray-900 whitespace-nowrap">
                Updated date
              </th>
            </tr>
          </thead>
          <tbody ref={btnRef}>
            {posts.filterPosts?.data.map((item, index) => {
              return (
                <SinglePost
                  key={index}
                  post={item}
                  index={index}
                  handlePopupClick={handlePopupClick}
                />
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="emptBox h-48 grid place-items-center border-2">
          <h2 className=" font-montserrat font-semibold text-center">
            Posts not found
          </h2>
        </div>
      )}

      {showPopup ? (
        // <div className="absolute z-50 backdrop-blur-md">
        <Sidebar
          className="bg-gray-200 shadow-md border-2 border-slate-600 sidebar_container"
          style={
            position
              ? {
                  top: `${
                    position.elementPosition.top +
                    position.elementPosition.height
                  }px`,
                  left: `${position.elementPosition.left}px`,
                }
              : ""
          }
        >
          <Menu>
            <MenuItem
              icon={<FaEdit />}
              component={<Link to={`/posts/edit/${singlePostId}`} />}
            >
              Edit
            </MenuItem>
            <MenuItem
              icon={<FaTrashAlt />}
              onClick={() => deletePostHandler(singlePostId, categories)}
            >
              {" "}
              Delete
            </MenuItem>
          </Menu>
        </Sidebar>
      ) : (
        // </div>
        ""
      )}
    </div>
  );
}

export default AllPosts;
