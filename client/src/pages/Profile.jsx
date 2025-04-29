import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const ProfileField = ({ label, value }) => (
  <div>
    <p className="text-gray-700 capitalize text-sm sm:text-base">{label}</p>
    <p className="w-full border rounded-md px-4 py-2 bg-gray-100 text-sm sm:text-base">
      {value || "-"}
    </p>
  </div>
);

const Profile = () => {
  const { user } = useSelector((state) => state.auth) || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate(-1);
    }
  }, [user, navigate]);

  return (
    <>
      <Navbar />
      <div className="w-11/12 max-w-screen-xl mx-auto mt-12 sm:mt-16 px-4">
        <p className="text-3xl sm:text-4xl font-semibold text-center">Welcome</p>
        <p className="mt-2 text-gray-600 text-center text-sm sm:text-base">
          {new Date().toDateString()}
        </p>

        <div className="bg-gray-100 mt-6 sm:mt-10 p-4 sm:p-8 rounded-lg shadow-lg">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-x-8">
            <div className="relative">
              {user?.image ? (
                <img
                  src={user.image}
                  className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-full border-2 border-stone-400"
                  alt="Profile"
                />
              ) : (
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-stone-400 bg-slate-200 flex items-center justify-center">
                  <FaUser className="text-indigo-500 text-4xl sm:text-5xl" />
                </div>
              )}
            </div>

            <div className="flex-1 w-full flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="text-center sm:text-left">
                <p className="text-2xl sm:text-4xl font-medium text-indigo-500">
                  {`${user?.firstName || ""} ${user?.lastName || ""}` || "User"}
                </p>
                <p className="text-sm sm:text-lg text-gray-600 break-words">
                  {user?.email || "No email provided"}
                </p>
              </div>

              <div className="mt-4 sm:mt-0 sm:ml-4">
                <Link
                  to="/edit-profile"
                  className="inline-block px-5 sm:px-6 py-2 text-sm sm:text-base text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition duration-300"
                >
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-y-6 sm:gap-x-12 text-base">
            <ProfileField label="First Name" value={user?.firstName} />
            <ProfileField label="Last Name" value={user?.lastName} />
            <ProfileField label="Gender" value={user?.gender} />
            <ProfileField label="Country" value={user?.country} />
            <ProfileField label="Email" value={user?.email} />
          </div>

          {/* Dashboard Link */}
          <div className="mt-12 text-center">
            <Link
              to="/dashboard"
              className="inline-block px-6 py-2 text-sm sm:text-base text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 transition duration-300"
            >
              Go To Dashboard
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
