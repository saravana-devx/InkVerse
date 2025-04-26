import React from "react";
import { Link } from "react-router-dom";
import { GiCrossMark } from "react-icons/gi";

const SideBar = ({ toggleSideBar, handleLogOut, loggedIn }) => {
  return (
    <div className="fixed top-0 right-0 z-10 h-screen bg-indigo-600 w-full sm:w-5/12 flex flex-col gap-y-8 justify-center items-center text-white">
      <button onClick={toggleSideBar} className="absolute right-4 top-10">
        <GiCrossMark className="w-8 h-8 hover:text-red-500 transition duration-300" />
      </button>

      <nav className="flex flex-col gap-y-4 text-lg font-semibold">
        <Link
          onClick={toggleSideBar}
          className="cursor-pointer hover:text-indigo-300 transition duration-300"
          to="/"
        >
          Home
        </Link>
        <Link
          onClick={toggleSideBar}
          className="cursor-pointer hover:text-indigo-300 transition duration-300"
          to="/writeBlog"
        >
          Write
        </Link>
      </nav>

      <div className="flex flex-col gap-y-4">
        {!loggedIn ? (
          <ul className="flex flex-col items-center gap-y-4">
            <li className="px-4 py-2 border-2 border-white rounded-lg hover:bg-indigo-500 transition duration-300">
              <Link onClick={toggleSideBar} to="/login">
                Login
              </Link>
            </li>
            <li className="px-4 py-2 border-2 border-white rounded-lg hover:bg-indigo-500 transition duration-300">
              <Link onClick={toggleSideBar} to="/signUp">
                Sign Up
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="flex flex-col items-center gap-y-4">
            <li className="px-4 py-2 border-2 border-white rounded-lg hover:bg-indigo-500 transition duration-300">
              <Link onClick={toggleSideBar} to="/profile">
                Profile
              </Link>
            </li>
            <li className="px-4 py-2 border-2 border-white rounded-lg hover:bg-red-500 transition duration-300">
              <Link
                onClick={() => {
                  toggleSideBar();
                  handleLogOut();
                }}
                to="/"
              >
                Logout
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default SideBar;
