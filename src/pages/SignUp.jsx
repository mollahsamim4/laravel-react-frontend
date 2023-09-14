import React, { useCallback, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputErrorField from "../components/InputErrorField";
import { registerUser } from "../store/user/UserSlice";

const defaultUserData = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

function SignUp() {
  const [formData, setFormData] = useState(defaultUserData);

  const [form_data_error_field, setForm_data_error_field] =
    useState(defaultUserData);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  //   when change form input field

  const onchangeHandler = useCallback(
    (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    },
    [formData]
  );

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    dispatch(registerUser(formData));

    setForm_data_error_field(defaultUserData);
    navigate("/login");
  };

  return (
    <div className=" w-full  bg-zinc-500 p-4 signInContainer">
      <form
        action=""
        className="sm:w-5/12 md:w-6/12 lg:w-4/12 mt-8 mx-auto bg-gray-800 p-4 bg-opacity-25  rounded-md shadow-lg shadow-gray-700"
        method="post"
        onSubmit={handleSubmitForm}
      >
        <div className="form-group mb-2">
          <label
            htmlFor="name"
            className=" font-lato font-medium text-gray-800 pb-2"
          >
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            placeholder="Enter your name here..."
            className="w-full p-2 rounded-sm font-lato  placeholder:text-gray-400 outline-none focus:ring-4  antialiased font-medium"
            onChange={onchangeHandler}
          />
          {form_data_error_field.name ? (
            <InputErrorField text={form_data_error_field.name} />
          ) : (
            ""
          )}
        </div>
        <div className="form-group mb-2">
          <label
            htmlFor="email"
            className=" font-lato antialiased font-medium text-gray-800 pb-2"
          >
            Email:
          </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            id="email"
            placeholder="Enter your email here..."
            className="w-full p-2 rounded-sm font-lato antialiased font-medium  placeholder:text-gray-400 outline-none focus:ring-4 "
            onChange={onchangeHandler}
          />
          {form_data_error_field.email ? (
            <InputErrorField text={form_data_error_field.email} />
          ) : (
            ""
          )}
        </div>
        <div className="form-group mb-2">
          <label
            htmlFor="email"
            className=" font-lato antialiased font-medium text-gray-800 pb-2"
          >
            Password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            placeholder="Enter your password here..."
            className="w-full p-2 rounded-sm antialiased font-medium font-lato  placeholder:text-gray-400 outline-none focus:ring-4 "
            onChange={onchangeHandler}
          />
          {form_data_error_field.password ? (
            <InputErrorField text={form_data_error_field.password} />
          ) : (
            ""
          )}
        </div>
        <div className="form-group mb-2">
          <label
            htmlFor="confirm_password"
            className=" font-lato antialiased font-medium text-gray-800 pb-2"
          >
            Password:
          </label>
          <input
            type="password"
            name="password_confirmation"
            id="confirm_password"
            value={formData.password_confirmation}
            placeholder="Enter your password here..."
            className="w-full p-2 rounded-sm antialiased font-medium font-lato  placeholder:text-gray-400 outline-none focus:ring-4 "
            onChange={onchangeHandler}
          />
          {form_data_error_field.password_confirmation ? (
            <InputErrorField
              text={form_data_error_field.password_confirmation}
            />
          ) : (
            ""
          )}
        </div>
        <div className="form-group mb-2">
          <div className="btn_group flex justify-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-sky-600 to-indigo-700 px-4 py-2 rounded font-lato text-gray-200 font-meidum flex items-center gap-x-2 justify-center"
              onClick={handleSubmitForm}
            >
              <FaSignInAlt /> Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
