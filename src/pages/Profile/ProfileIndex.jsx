import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

import { BsFillPostcardFill } from "react-icons/bs";
import { FaBars, FaEdit } from "react-icons/fa";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import { useDispatch, useSelector } from "react-redux";
function ProfileIndex() {
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
              <div className="p-4"></div>
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
              <SubMenu icon={<BsFillPostcardFill />} label="Profile">
                <MenuItem
                  icon={<FaEdit />}
                  component={<Link to="/profile/forget-password" />}
                >
                  Password reset
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

export default ProfileIndex;
