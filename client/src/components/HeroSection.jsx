import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="bg-indigo-100 min-h-[650px] flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-5xl font-bold text-gray-900">
        The best way to{" "}
        <span className="bg-indigo-300 px-3 py-1 rounded-lg">share</span> your
        thoughts
      </h1>
      <p className="text-gray-700 text-lg mt-4 max-w-2xl">
        Write, publish, and explore high-quality blogs in an intuitive and
        user-friendly platform.
      </p>
      <div className="mt-6 space-x-4">
        <Link
          to="/pagination"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-indigo-700"
        >
          Explore Now
        </Link>
        <Link
          to="/writeBlog"
          className="bg-white border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg text-lg font-semibold shadow-md hover:bg-indigo-50"
        >
          Create Blog
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
