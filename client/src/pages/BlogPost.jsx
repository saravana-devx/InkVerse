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
      const editor = new EditorJS({
        holder: "editorjs",
        data: blog.content,
        readOnly: true,
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

  if (!blog) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="px-4 py-6 w-full max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">{blog.title}</h1>
        <p className="text-base sm:text-lg text-gray-700 mb-4">{blog.description}</p>

        <div className="mt-2 mb-4 flex flex-wrap gap-2">
          {blog.tags.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>

        <div className="text-gray-600 text-sm sm:text-base font-medium my-4">
          👁️ Total views: {blog.totalViews}
        </div>

        {blog.thumbnail && (
          <img
            src={blog.thumbnail}
            className="w-full h-auto max-h-[400px] object-cover rounded-md my-6"
            alt="Blog Thumbnail"
          />
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
