import React from "react";
import Navbar from "../components/Navbar";
import Cards from "../components/Cards";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

const BlogListWithPagination = () => {
  const { blogs, loading } = useSelector((state) => state.page);
  return (
    <div>
      <Navbar />
      <div className="mt-24 w-4/5 mx-auto">
        <Cards blogs={blogs} loading={loading} />
        <Pagination />
      </div>
      <Footer />
    </div>
  );
};

export default BlogListWithPagination;