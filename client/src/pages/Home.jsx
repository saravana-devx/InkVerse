import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Cards from "../components/Cards";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import BaseUrl from "../utils/BaseUrl";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [trendingBlogs, setTrendingBlogs] = useState([]);
  const [loadingLatest, setLoadingLatest] = useState(true);
  const [loadingTrending, setLoadingTrending] = useState(true);

  // Fetch Latest Blogs
  useEffect(() => {
    const fetchLatestBlogs = async () => {
      setLoadingLatest(true);
      try {
        const response = await axios.get(BaseUrl + "/blog/latest");
        setLatestBlogs(response.data.blogs);
      } catch (error) {
        // console.error("Error fetching latest blogs:", error);
      } finally {
        setLoadingLatest(false);
      }
    };
    fetchLatestBlogs();
  }, []);

  // Fetch Trending Blogs
  useEffect(() => {
    const fetchTrendingBlogs = async () => {
      setLoadingTrending(true);
      try {
        const response = await axios.get(BaseUrl + "/blog/trending");
        setTrendingBlogs(response.data.blogs);
      } catch (error) {
        // console.error("Error fetching trending blogs:", error);
      } finally {
        setLoadingTrending(false);
      }
    };
    fetchTrendingBlogs();
  }, []);

  return (
    <div className="bg-gray-100 text-gray-800">
      <Navbar />
      <div className="flex flex-col justify-center w-full lg:gap-x-10 2xl:gap-x-[4%]">
        <HeroSection />
        
        <div className="flex flex-col justify-center items-center gap-x-10 w-11/12 lg:w-4/5 mx-auto">
          {/* Trending Blogs Section */}
          <h2 className="text-left underline my-10 font-bold text-3xl text-indigo-700">
            Trending Blogs
          </h2>
          {loadingTrending ? (
            <div className="flex justify-center py-5">
              <span className="loader">Loading Trending Blogs...</span>
            </div>
          ) : (
            <Cards blogs={trendingBlogs} />
          )}

          {/* Recent Blogs Section */}
          <h2 className="text-left underline my-10 font-bold text-3xl text-indigo-700">
            Recent Blogs
          </h2>
          {loadingLatest ? (
            <div className="flex justify-center py-5">
              <span className="loader">Loading Latest Blogs...</span>
            </div>
          ) : (
            <Cards blogs={latestBlogs} />
          )}

          {/* Read More Button */}
          <div className="my-14">
            <Link
              to="/pagination"
              className="bg-indigo-500 hover:bg-indigo-600 font-bold py-3 px-8 rounded-lg shadow-lg transition duration-300 ease-in-out text-white"
            >
              Read More Blogs
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
