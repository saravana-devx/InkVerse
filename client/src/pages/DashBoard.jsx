import React, { useEffect, useState } from "react";
import axios from "axios";
import BaseUrl from "../utils/BaseUrl";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import formatDate from "../utils/formatDate";
import Footer from "../components/Footer";
import toast from "react-simple-toasts";
import { useDispatch, useSelector } from "react-redux";
import { setBlogId } from "../redux/slices/blogSlice";

const Dashboard = () => {
  const token = localStorage.getItem("user");
  const [blogs, setBlogs] = useState([]);
  const [additionalData, setAdditionalData] = useState({
    totalBlogs: 0,
    totalViews: 0,
  });
  const dispatch = useDispatch();
  async function deleteBlog(id) {
    try {
      console.log(id);
      const response = await axios.post(
        `${BaseUrl}/blog/deleteBlog/${id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setBlogs(blogs.filter((blog) => blog._id !== id));
      toast("Blog Delete Successfully");
    } catch (error) {
      console.error("Error while deleting blogs ", error);
    }
  }

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/blog/userBlogs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlogs(response.data.blogs);
        setAdditionalData({
          totalBlogs: response.data.totalBlogs,
          totalViews: response.data.totalViews,
        });
        // console.log(response);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchBlogs();
  }, [token]);

  const { user } = useSelector((state) => state.auth) || {};
  const navigate = useNavigate();

  if (!user) {
    navigate(-1);
  }

  if (blogs && blogs.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-red-100 text-red-700 border border-red-400 rounded-lg p-6">
        <p className="text-lg font-semibold text-center">
          No blogs have been posted yet. Start the conversation by creating the
          first one!
        </p>
        <Link
          to="/writeBlog"
          className="px-6 text-lg text-white py-2 border-2 bg-indigo-500 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 transition duration-300 w-full md:w-auto text-center mt-4"
        >
          Create
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Navbar />
      <div className="flex flex-col items-center w-full px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 mt-4">
        {/* Blog Statistics */}
        <div className="w-full max-w-4xl">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Blog Statistics
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gray-100 rounded-md p-4 flex flex-col justify-center items-center">
                <p className="text-sm text-gray-600 mb-2">Total Blogs</p>
                <p className="text-3xl font-semibold text-gray-800">
                  {additionalData.totalBlogs}
                </p>
              </div>
              <div className="bg-gray-100 rounded-md p-4 flex flex-col justify-center items-center">
                <p className="text-sm text-gray-600 mb-2">Total Views</p>
                <p className="text-3xl font-semibold text-gray-800">
                  {additionalData.totalViews}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Blogs Section */}
        <div className="w-full max-w-5xl mt-6 min-h-[400px]">
          <div className="bg-white rounded-lg shadow-md p-6 overflow-x-auto">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Recent Blogs Posted
            </h2>
            <table className="w-full text-sm text-gray-500">
              <thead className="bg-indigo-400 text-gray-100">
                <tr>
                  <th className="px-4 py-3">Date Updated</th>
                  <th className="px-4 py-3">Blog Title</th>
                  <th className="px-4 py-3">Blog Image</th>
                  <th className="px-4 py-3">Total Views</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {blogs.map((blog) => (
                  <React.Fragment key={blog._id}>
                    <tr>
                      <td className="px-4 py-3">
                        {formatDate(blog.updatedAt).date}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          to={`/blog?blog-title=${blog.slug}`}
                          className="text-indigo-600 hover:underline"
                        >
                          {blog.title}
                        </Link>
                      </td>
                      <td className="px-4 py-3 flex justify-center">
                        <img
                          src={blog.thumbnail}
                          alt={blog.title}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        {blog.totalViews}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Link
                          to={`/editBlog?blog-title=${blog.slug}`}
                          className="text-indigo-600 hover:underline mr-2"
                          onClick={() => dispatch(setBlogId(blog._id))}
                        >
                          Edit
                        </Link>
                        <span
                          className="text-red-600 cursor-pointer hover:underline"
                          onClick={() => deleteBlog(blog._id)}
                        >
                          Delete
                        </span>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
