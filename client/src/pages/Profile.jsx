import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const ProfileField = ({ label, value }) => (
  <div>
    <p className="text-gray-700 capitalize">{label}</p>
    <p className="w-full border rounded-md px-4 py-2 bg-gray-100">
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
      <div className="w-4/5 max-w-screen-xl mx-auto mt-14 h-auto">
        <p className="text-4xl font-semibold text-center">Welcome</p>
        <p className="mt-2 text-gray-600 text-center">
          {new Date().toDateString()}
        </p>

        <div className="bg-gray-100 my-4 p-8 rounded-lg shadow-lg">
          <div className="flex items-center gap-x-5">
            <div className="relative">
              {user?.image ? (
                <img
                  src={user.image}
                  className="object-contain w-32 h-32 rounded-full border-2 border-stone-400"
                  alt="Profile"
                />
              ) : (
                <div className="w-32 h-32 rounded-full border-2 border-stone-400 bg-slate-200 flex items-center justify-center">
                  <FaUser className="text-indigo-500 text-5xl" />
                </div>
              )}
            </div>
            <div className="flex-1 flex justify-between items-center">
              <div>
                <p className="text-4xl mb-2 font-medium text-indigo-500">
                  {`${user?.firstName || ""} ${user?.lastName || ""}` || "User"}
                </p>
                <p className="text-lg text-gray-600">
                  {user?.email || "No email provided"}
                </p>
              </div>
            </div>
            <Link
              to="/edit-profile"
              className="px-6 text-lg text-white py-2 border-2 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition duration-300"
            >
              Edit Profile
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-x-12 text-lg">
            <ProfileField label="First Name" value={user?.firstName} />
            <ProfileField label="Last Name" value={user?.lastName} />
            <ProfileField label="Gender" value={user?.gender} />
            <ProfileField label="Country" value={user?.country} />
            <ProfileField label="Email" value={user?.email} />
          </div>

          <div className="mt-16">
            <Link
              to="/dashboard"
              className="px-6 text-lg text-white py-2 border-2 bg-indigo-500 rounded-lg hover:bg-indigo-600 transition duration-300"
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
