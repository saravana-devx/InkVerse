import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBlogId } from "../redux/slices/blogSlice";

const Card = ({ thumbnail, tag, title, slug, blogId, description }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Function to fetch the blog by ID
  async function fetchBlogsById(blogId) {
    dispatch(setBlogId(blogId));
    navigate(`/blog?blog-title=${slug}`);
  }

  return (
    <div className="flex flex-col mb-6 md:flex-col gap-6 p-6 shadow-xl rounded-lg bg-white transition-transform transform hover:scale-105 hover:shadow-2xl w-full max-w-sm mx-auto">
      {/* Blog Thumbnail */}
      <img
        onClick={() => fetchBlogsById(blogId)}
        className="h-[200px] w-full object-cover rounded-lg cursor-pointer transition duration-300 ease-in-out hover:opacity-80"
        src={thumbnail}
        alt="Blog thumbnail"
      />

      {/* Blog Content */}
      <div className="flex flex-col justify-between">
        {/* Blog Date and Title */}
        <div>
          <p className="text-gray-500 text-sm">April 20, 2022</p>
          <p
            className="text-indigo-700 font-semibold text-xl mt-2 cursor-pointer hover:underline"
            onClick={() => fetchBlogsById(blogId)}
          >
            {title}
          </p>
          <p className="text-gray-700 text-sm mt-2">
            {description.slice(0, 150)}
            <span
              className="text-indigo-700 font-semibold cursor-pointer hover:underline ml-1"
              onClick={() => fetchBlogsById(blogId)}
            >
              Read more
            </span>
          </p>
        </div>

        {/* Tags Section */}
        <div className="flex flex-wrap gap-2 mt-4">
          {tag.slice(0, 3).map((t, index) => (
            <span
              key={index}
              // onClick={() =>
              //   navigate({
              //     pathname: "/search",
              //     search: `?query=${t}`,
              //   })
              // }
              className="select-none text-indigo-500 font-medium rounded-full px-4 py-2 bg-indigo-100 cursor-pointer transition duration-200 ease-in-out hover:bg-indigo-200"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
