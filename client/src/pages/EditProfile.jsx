import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import axios from "axios";
import BaseUrl from "../utils/BaseUrl";
import { uploadImageToCloudinary } from "../utils/handleImages";
import { updateUserDetails } from "../redux/slices/authSlice";

const EditProfile = () => {
  const { user } = useSelector((state) => state.auth) || {};
  const [formData, setFormData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      navigate(-1);
    } else {
      const initialData = {
        image: user.image || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        gender: user.gender || "",
        country: user.country || "",
        email: user.email || "",
      };
      setFormData(initialData);
      setOriginalData(initialData);
      setPreviewImage(user.image || "/default-avatar.png");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const isDataChanged = () => {
    if (!formData || !originalData) return false;
    return Object.keys(formData).some(
      (key) => formData[key] !== originalData[key]
    );
  };

  const handleSaveClick = async () => {
    if (!isDataChanged()) {
      toast("No changes detected.");
      return;
    }

    setLoading(true);
    try {
      let updatedImage = formData.image;

      if (typeof updatedImage === "object") {
        updatedImage = await uploadImageToCloudinary(updatedImage);
      }

      const updatedData = { ...formData, image: updatedImage };
      await axios.put(`${BaseUrl}/auth/updateProfile`, updatedData, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      toast("Profile updated successfully!");
      setOriginalData(updatedData);
      dispatch(updateUserDetails(updatedData));
      navigate("/profile");
    } catch (error) {
      toast("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-11/12 max-w-screen-xl mx-auto mt-14 px-4">
        <p className="text-3xl sm:text-4xl font-semibold text-center">Edit Profile</p>
        <p className="mt-2 text-gray-600 text-center text-sm sm:text-base">
          {new Date().toDateString()}
        </p>

        <div className="bg-gray-100 my-6 p-4 sm:p-8 rounded-lg shadow-lg">
          {/* Header Info Section */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={previewImage}
                className="object-cover w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-stone-400"
                alt="Profile"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                disabled={loading}
              />
            </div>

            <div className="flex-1 w-full flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="text-center sm:text-left">
                <p className="text-2xl sm:text-3xl font-medium text-indigo-500">
                  {`${formData?.firstName} ${formData?.lastName}` || "User"}
                </p>
                <p className="text-sm sm:text-base text-gray-600">
                  {formData?.email || "No email provided"}
                </p>
              </div>

              <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-right">
                <button
                  onClick={handleSaveClick}
                  disabled={loading || !isDataChanged()}
                  className="w-full sm:w-auto px-5 py-2 text-sm sm:text-base text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg disabled:opacity-50"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          {/* Form Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-y-6 sm:gap-x-12 text-sm sm:text-base">
            {["firstName", "lastName", "gender", "country", "email"].map(
              (field) => (
                <div key={field}>
                  <p className="text-gray-700 capitalize mb-1">
                    {field.replace(/([A-Z])/g, " $1")}
                  </p>
                  <input
                    type="text"
                    name={field}
                    value={formData?.[field] || ""}
                    placeholder={`Enter ${field}`}
                    className="w-full border rounded-md px-4 py-2 focus:outline-none border-indigo-500 bg-white"
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditProfile;
