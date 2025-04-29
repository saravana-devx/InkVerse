import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaUser } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import SideBar from "./SideBar";
import toast from "react-simple-toasts";

import { useDispatch, useSelector } from "react-redux";
import { setLoggedIn } from "../redux/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { loggedIn, user } = useSelector((state) => state.auth);
  const image = user ? user.image : null;
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [isSideBarOpen, setSideBarOpen] = useState(false);
  const [modal, setModal] = useState(false);

  function toggleSideBar() {
    setSideBarOpen(!isSideBarOpen);
  }

  function handleLogOut() {
    dispatch(setLoggedIn(false));
    toast("Logged Out");
    setModal(false);
    localStorage.clear();
  }

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter" && searchText.trim() !== "") {
      navigate({
        pathname: "/search",
        search: `?query=${searchText.toLowerCase()}`,
      });
    }
  };

  const onChangeHandler = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="w-full bg-gray-800 text-white">
      <div className="container mx-auto flex justify-between items-center py-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl">
          InkVerse
        </Link>

        {/* Search bar (only on desktop) */}
        <div className="hidden sm:flex relative items-center">
          <input
            value={searchText}
            onChange={onChangeHandler}
            onKeyDown={handleSearchKeyPress}
            type="text"
            placeholder="Search"
            className="block bg-indigo-200 w-72 rounded-3xl border-1 outline-1 px-4 py-1.5 text-gray-900
            shadow-sm ring-1 ring-indigo-500 placeholder:text-gray-400
            focus:ring-inset focus:outline-indigo-500 sm:text-sm sm:leading-6"
          />
          <FaSearch className="absolute text-black right-2 top-2.5 w-8" />
        </div>

        {/* Right side links */}
        <div className="hidden sm:flex items-center gap-x-4 lg:gap-x-8 font-semibold">
          {!loggedIn ? (
            <>
              <Link
                to="/login"
                className="px-4 py-1 border-2 border-indigo-500 rounded-lg hover:text-white hover:bg-indigo-500"
              >
                Login
              </Link>
              <Link
                to="/signUp"
                className="px-4 py-1 border-2 border-indigo-500 rounded-lg hover:text-white hover:bg-indigo-500"
              >
                SignUp
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/writeBlog"
                className="cursor-pointer hover:text-indigo-500"
              >
                Write
              </Link>

              <div className="relative">
                {image ? (
                  <img
                    src={image}
                    onClick={() => setModal(!modal)}
                    className="w-10 h-10 rounded-full object-contain border-2 border-indigo-600 shadow-md cursor-pointer hover:opacity-75 transition-opacity duration-300"
                    alt="Profile"
                  />
                ) : (
                  <FaUser
                    onClick={() => setModal(!modal)}
                    className="text-indigo-400 rounded-full bg-slate-200 p-2 w-9 h-9 cursor-pointer"
                  />
                )}
                {modal && (
                  <div className="absolute z-10 px-2 py-2 rounded-lg bg-indigo-200 w-48 h-[130px]">
                    <ul className="flex flex-col text-lg">
                      <li className="border-b-2 mt-2 w-full border-gray-200">
                        <Link to="/profile">Profile</Link>
                      </li>
                      <li className="border-b-2 mt-2 w-full border-gray-200">
                        <Link to="/dashboard">Dashboard</Link>
                      </li>
                      <li className="w-full my-2">
                        <Link
                          to="/"
                          onClick={() => {
                            setModal(false);
                            handleLogOut();
                          }}
                        >
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Hamburger menu (mobile only) */}
        <div className="sm:hidden">
          <button
            onClick={toggleSideBar}
            aria-label="Toggle menu"
            className="p-2"
          >
            <RxHamburgerMenu className="w-8 h-8 text-white" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isSideBarOpen && (
        <div className="sm:hidden fixed top-0 left-0 w-full h-full z-50 bg-gray-900 bg-opacity-95 p-6">
          <div className="flex justify-end">
            <button onClick={toggleSideBar} className="text-white text-3xl">
              &times;
            </button>
          </div>
          <div className="mt-6 space-y-4 text-lg">
            {!loggedIn ? (
              <>
                <Link
                  to="/login"
                  onClick={toggleSideBar}
                  className="block px-4 py-2 border border-indigo-500 rounded hover:bg-indigo-500"
                >
                  Login
                </Link>
                <Link
                  to="/signUp"
                  onClick={toggleSideBar}
                  className="block px-4 py-2 border border-indigo-500 rounded hover:bg-indigo-500"
                >
                  SignUp
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/writeBlog"
                  onClick={toggleSideBar}
                  className="block hover:text-indigo-400"
                >
                  Write
                </Link>
                <Link
                  to="/profile"
                  onClick={toggleSideBar}
                  className="block hover:text-indigo-400"
                >
                  Profile
                </Link>
                <Link
                  to="/dashboard"
                  onClick={toggleSideBar}
                  className="block hover:text-indigo-400"
                >
                  Dashboard
                </Link>
                <Link
                  to="/"
                  onClick={() => {
                    toggleSideBar();
                    handleLogOut();
                  }}
                  className="block hover:text-red-400"
                >
                  Logout
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
