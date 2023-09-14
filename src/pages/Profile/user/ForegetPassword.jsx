import React, { Fragment, useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Card from "../../../components/Card";
import { setLoading } from "../../../store/GlobalSlice";
import { forgetPassword } from "../../../store/user/UserSlice";

const ForegetPassword = () => {
  const [email, setEmail] = useState(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(forgetPassword({ email }));
  };

  useEffect(() => {
    user.isLoading ? dispatch(setLoading(true)) : dispatch(setLoading(false));
  }, [user.isLoading]);
  return (
    <Fragment>
      <Card header_text="Password Reset" icon={<FaLock />}>
        <form
          action="#"
          onSubmit={submitHandler}
          method="post"
          className="md:w-6/12 mx-auto bg-zinc-400 p-4 shadow-2xl shadow-gray-400 rounded-md"
        >
          {user.status ? (
            <div className="my-2">
              <h2 className="text-green-800 font-lato font-semibold text-center">
                {user.status}
              </h2>
            </div>
          ) : (
            ""
          )}
          <div className="form-group mb-2 w-full flex gap-2 items-center">
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-4 py-2 rounded-md outline-none focus:ring-4 font-lato font-semibold placeholder:font-lato placeholder:font-semibold"
              placeholder="Enter your email here..."
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mb-2 flex justify-center">
            <button
              type="submit"
              onClick={submitHandler}
              className=" font-montserrat bg-gradient-to-r from-indigo-500 to-green-800 px-4 py-2 rounded shadow-md text-gray-200 font-semibold"
            >
              Submit
            </button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default ForegetPassword;
