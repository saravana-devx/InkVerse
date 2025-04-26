import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogForm from "../components/BlogForm";
import axios from "axios";
import BaseUrl from "../utils/BaseUrl";

const BlogCreation = () => {
  const handleCreateBlog = async (blogData) => {
    const token = localStorage.getItem("user");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    await axios.post(`${BaseUrl}/blog/uploadBlog`, blogData, config);
  };

  return (
    <>
      <Navbar />
      <BlogForm onSubmit={handleCreateBlog} isEdit={false} />
      <Footer />
    </>
  );
};

export default BlogCreation;
