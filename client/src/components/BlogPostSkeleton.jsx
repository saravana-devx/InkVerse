import React from "react";

const BlogPostSkeleton = () => {
  return (
    <div className="w-full lg:full xl:w-full mx-auto mt-24 select-none">
      <div className="bg-gray-200 h-6 w-1/4 rounded mb-4"></div>
      <div className="bg-gray-200 h-10 w-3/4 rounded mb-6"></div>
      <div className="bg-gray-200 h-6 w-1/2 rounded mb-2"></div>
      <div className="bg-gray-200 h-6 w-1/4 rounded mb-2"></div>
      <div className="bg-gray-200 h-64 w-full rounded mb-6"></div>
      <div className="bg-gray-200 h-6 w-full rounded mb-2"></div>
      <div className="bg-gray-200 h-6 w-5/6 rounded mb-2"></div>
      <div className="bg-gray-200 h-6 w-3/4 rounded mb-2"></div>
      <div className="bg-gray-200 h-64 w-full rounded mb-6"></div>
      <div className="bg-gray-200 h-6 w-full rounded mb-2"></div>
      <div className="bg-gray-200 h-6 w-5/6 rounded mb-2"></div>
      <div className="bg-gray-200 h-6 w-3/4 rounded mb-2"></div>
    </div>
  );
};

export default BlogPostSkeleton;
