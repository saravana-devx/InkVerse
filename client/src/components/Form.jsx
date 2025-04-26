import React, { useState } from "react";
import axios from "axios";
import BaseUrl from "../utils/BaseUrl";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-simple-toasts";

import { setLoggedIn, setUserDetails } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";

const Form = ({ isSignUp }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function onChangeHandler(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  async function submitHandler(e) {
    e.preventDefault();
    try {
      const endPoints = isSignUp ? "/auth/signUp" : "/auth/login";
      const response = await axios.post(BaseUrl + endPoints, formData);
      if (response.status === 200) {
        localStorage.setItem("user", response.data.token);
        dispatch(setLoggedIn(true));
        dispatch(setUserDetails(response.data.user));
        navigate("/");
        toast(
          `Successfully ${isSignUp ? "Signed In" : "LoggedIn"}
        to Your Account`
        );
      }
    } catch (error) {
      // console.error("Error:", error.response); // Handle errors
      if (error.response.status === 409) {
        toast("Password doesn't match");
      } else if (error.response.status === 404) {
        toast("User doesn't exists");
      }
    }
  }

  return (
    <div className="grid place-items-center w-full h-full">
      <div className="px-6 py-12  border-2 border-gray-200 rounded-xl">
        <div className="sm:mx-auto sm:w-full ">
          <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight">
            {isSignUp ? "Sign in to your account" : "Login in to your account"}
          </h2>
        </div>

        <div className="mt-10 md:w-[400px] lg:w-[500px] ">
          <form className="space-y-6" onSubmit={submitHandler}>
            <div>
              <label className="block text-sm font-medium leading-6 ">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={onChangeHandler}
                  required
                  className="block text-black w-full rounded-md border-0 px-2 py-1.5  shadow-sm ring-1  ring-gray-300 placeholder:text-gray-400  focus:ring-inset focus:ring-indigo-300 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium leading-6 ">
                  Password
                </label>
                {!isSignUp && "Forget Password"}
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={onChangeHandler}
                  required
                  className="block w-full text-black rounded-md border-0 px-2 py-1.5 shadow-sm ring-1  ring-gray-300 placeholder:text-gray-400  focus:ring-inset focus:ring-indigo-300 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isSignUp ? "signUp" : "login"}
              </button>
            </div>

            <div className="flex justify-between items-center">
              <p>{isSignUp ? "Already have a account" : "Create one "} ?</p>

              <Link
                className="text-indigo-500"
                to={isSignUp ? "/login" : "/signUp"}
              >
                {isSignUp ? "login" : "signUp "}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
