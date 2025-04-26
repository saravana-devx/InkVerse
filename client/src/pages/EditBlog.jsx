import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BlogForm from "../components/BlogForm";
import axios from "axios";
import BaseUrl from "../utils/BaseUrl";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";

const EditBlog = () => {
  const { blogId } = useSelector((state) => state.blog);
  const [initialData, setInitialData] = useState({
    thumbnail: "",
    title: "",
    description: "",
    tags: [],
    content: {
      blocks: [],
    },
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const slug = searchParams.get("blog-title");

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BaseUrl}/blog/blogId/${slug}`);
        const blogData = response.data.blog;

        if (!blogData.content) {
          throw new Error("Content is missing in the blog data");
        }

        setInitialData({
          thumbnail: blogData.thumbnail,
          title: blogData.title,
          description: blogData.description,
          tags: blogData.tags,
          content: blogData.content,
        });
      } catch (error) {
        // console.error("Error fetching blog data:", error);
        toast("Failed to load blog data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleUpdateBlog = async (blogData, config) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${BaseUrl}/blog/editBlog/${blogId}`,
        blogData,
        config
      );
      toast("Blog updated successfully!");
      navigate("/dashboard");
    } catch (error) {
      // console.error("Error updating blog:", error);
      toast("Failed to update blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="text-xl">Loading...</div>
        </div>
      ) : (
        <BlogForm
          initialData={initialData}
          setInitialData={setInitialData}
          onSubmit={handleUpdateBlog}
          isEdit={true}
        />
      )}
      <Footer />
    </>
  );
};

export default EditBlog;
