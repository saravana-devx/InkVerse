import React, { useEffect, useState } from "react";
import axios from "axios";
import BaseUrl from "../utils/BaseUrl";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import ImageTool from "@editorjs/image";
import CodeTool from "@editorjs/code";
import Paragraph from "@editorjs/paragraph";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Comment from "../components/Comment";

export default function BlogPost() {
  const [blog, setBlog] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const slug = searchParams.get("blog-title");
  // Example of a frontend API call to fetch a blog by its ID
  const fetchBlog = async (id) => {
    const response = await axios.get(`${BaseUrl}/blog/blogId/${slug}`);
    return response.data.blog;
  };
  useEffect(() => {
    const fetchData = async () => {
      const blogData = await fetchBlog(slug);
      setBlog(blogData);
    };

    fetchData();
  }, [slug]);

  useEffect(() => {
    if (blog) {
      // Initialize EditorJS with the fetched blog content (if available)
      const editor = new EditorJS({
        holder: "editorjs", // The element where the content will be rendered
        data: blog.content, // The content retrieved from the backend (in JSON format)
        readOnly: true, // Make the editor read-only for displaying only
        tools: {
          header: Header,
          paragraph: Paragraph,
          list: List,
          image: ImageTool,
          code: CodeTool,
        },
      });
    }
  }, [blog]);

  if (!blog) return <div>Loading...</div>;
  const token = localStorage.getItem("user");

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">{blog.title}</h1>
        <p className="text-lg mb-4">{blog.description}</p>

        <div className="mt-4">
          {blog.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-200 rounded-full mr-2"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="text-gray-600 text-lg font-medium my-4">
          👁️Total views : {blog.totalViews}
        </div>
        {blog.thumbnail && (
          <img src={blog.thumbnail} className="my-8" alt="Blog Thumbnail" />
        )}

        <div
          id="editorjs"
          className="border p-4 rounded-md shadow-md bg-white"
        ></div>
      </div>

      <Comment slug={slug} />
    </>
  );
}
