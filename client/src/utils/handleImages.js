import axios from "axios";
import BaseUrl from "../utils/BaseUrl";

export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post(`${BaseUrl}/upload/image`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // console.log("Upload response:", response.data);
    return response.data.imageUrl;
  } catch (error) {
    // console.error("Error uploading image:", error);
    throw error;
  }
};

export const handleImageChange = (e, setPreviewImage, setFormData) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  }
};
