import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Card from "../../../components/Card";
import InputErrorField from "../../../components/InputErrorField";
import { resetPassword } from "../../../store/user/UserSlice";

const PassswordReset = () => {
  const { token } = useParams();
  let [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [newPassword, setNewPassword] = useState({
    password: "",
    password_confirmation: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      resetPassword({
        email: searchParams.get("email"),
        token,
        password: newPassword.password,
        password_confirmation: newPassword.password_confirmation,
      })
    );
    setNewPassword({ password: "", password_confirmation: "" });
  };

  return (
    <Card header_text="Add new password" className="md:w-8/12 mx-auto mt-4">
      <form
        action=""
        onSubmit={handleSubmit}
        className="md:w-6/12 mx-auto bg-zinc-500 p-4 rounded-md shadow-lg shadow-zinc-500"
      >
        {user.status ? (
          <div className="resetStatus">
            <h3 className="text-green-500 font-lato font-semibold text-center">
              {user.status}{" "}
              <Link
                to="/login"
                className="font-lato text-indigo-800 px-4 py-2 bg-blue-200 rounded-md shadow-lg"
              >
                Go to Login
              </Link>
            </h3>
          </div>
        ) : (
          ""
        )}
        <div className="form-group w-full mb-2">
          <label
            htmlFor="new_password"
            className="py-4 font-lato font-semibold mb-2 w-full text-gray-200"
          >
            New password
          </label>
          <input
            type="password"
            name="password"
            id="new_password"
            placeholder="Enter new password..."
            className=" px-4 py-2 rounded-sm w-full my-2 outline-none focus:ring-4 ring-indigo-700 ring-opacity-40"
            value={newPassword.password}
            onChange={(e) =>
              setNewPassword({
                ...newPassword,
                password: e.target.value,
              })
            }
          />
          {user.error?.errors?.password ? (
            <InputErrorField text={user.error.errors.password[0]} />
          ) : (
            ""
          )}
        </div>
        <div className="form-group w-full mb-2">
          <label
            htmlFor="new_password"
            className="py-4 font-lato font-semibold mb-2 w-full text-gray-200"
          >
            Confirm password
          </label>
          <input
            type="password"
            name="password_confirmation"
            id="new_password"
            placeholder="Enter Confirm password..."
            className=" px-4 py-2 rounded-sm w-full my-2 outline-none focus:ring-4 ring-indigo-700 ring-opacity-40"
            value={newPassword.password_confirmation}
            onChange={(e) =>
              setNewPassword({
                ...newPassword,
                password_confirmation: e.target.value,
              })
            }
          />
          {user.error?.errors?.password_confirmation ? (
            <InputErrorField
              text={user.error.errors.password_confirmation[0]}
            />
          ) : (
            ""
          )}
        </div>

        <div className="form-group flex justify-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-700 to-indigo-900 px-4 py-2 font-lato text-gray-200 shadow-lg rounded font-meidum text-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </Card>
  );
};

export default PassswordReset;
