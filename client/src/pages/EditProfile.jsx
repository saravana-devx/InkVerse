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
      // console.error("Error updating profile:", error);
      toast("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

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
              <img
                src={previewImage}
                className="object-contain w-32 h-32 rounded-full border-2 border-stone-400"
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
            <div className="flex-1 flex justify-between items-center">
              <div>
                <p className="text-4xl mb-2 font-medium text-indigo-500">
                  {`${formData?.firstName} ${formData?.lastName}` || "User"}
                </p>
                <p className="text-lg text-gray-600">
                  {formData?.email || "No email provided"}
                </p>
              </div>
            </div>
            <button
              onClick={handleSaveClick}
              disabled={loading || !isDataChanged()}
              className="px-6 py-2 text-lg text-white rounded-lg transition duration-300 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50"
            >
              Save Changes
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-x-12 text-lg">
            {["firstName", "lastName", "gender", "country", "email"].map(
              (field) => (
                <div key={field}>
                  <p className="text-gray-700 capitalize">
                    {field.replace(/([A-Z])/g, " $1")}
                  </p>
                  <input
                    type="text"
                    name={field}
                    value={formData?.[field] || ""}
                    placeholder={`Enter ${field}`}
                    className="w-full border rounded-md px-4 py-2 focus:outline-none border-indigo-500"
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
