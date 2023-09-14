import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import { AiOutlineWallet } from "react-icons/ai";
import { BiSolidCategory } from "react-icons/bi";
import { BsFillPostcardFill } from "react-icons/bs";
import { FaBars, FaEdit } from "react-icons/fa";
import { MdCreateNewFolder } from "react-icons/md";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { useDispatch, useSelector } from "react-redux";
function Index() {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [showHideSidebar, setShowHideSidebar] = useState(false);

  const showHideSidebarHandler = () => {
    setShowHideSidebar(!showHideSidebar);
  };

  return (
    <div className="postsContainer w-full">
      <div className="postsWrapper bg-gray-200 min-h-screen flex">
        <div className="sidebar">
          <Sidebar collapsed={showHideSidebar}>
            <div className="topSection flex items-center justify-between">
              <div className="p-4">
                <h3
                  className={`text-center font-lato font-semibold text-gray-100 bg-gradient-to-r from-purple-600 to-purple-800 p-3 shadow-md shadow-gray-800 rounded-sm ${
                    showHideSidebar ? "hidden" : "block"
                  }`}
                >
                  Welcome{" "}
                  <b>
                    <span className="font-semibold font-montserrat  first-letter:text-xl">
                      <code>{user.user.name}</code>
                    </span>
                  </b>
                </h3>
              </div>
              <div className="hideOrShow">
                <span>
                  <FaBars
                    onClick={showHideSidebarHandler}
                    className=" cursor-pointer"
                  />
                </span>
              </div>
            </div>

            <Menu className="font-lato font-semibold text-gray-600">
              <SubMenu icon={<BsFillPostcardFill />} label="Posts">
                <MenuItem icon={<FaEdit />} component={<Link to="/posts" />}>
                  All posts
                </MenuItem>
                <MenuItem
                  icon={<MdCreateNewFolder />}
                  component={<Link to={"/posts/create"} />}
                >
                  Create posts
                </MenuItem>
                {/* User profile */}
              </SubMenu>
              <SubMenu label="Category" icon={<BiSolidCategory />}>
                <MenuItem
                  component={<Link to="/posts/category" />}
                  icon={<AiOutlineWallet />}
                >
                  Category
                </MenuItem>
                <MenuItem
                  component={<Link to="/posts/category/create" />}
                  icon={<MdCreateNewFolder />}
                >
                  Create
                </MenuItem>
              </SubMenu>
            </Menu>
          </Sidebar>
        </div>
        <div className="contentWrapper bg-gray-50 w-full p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Index;
