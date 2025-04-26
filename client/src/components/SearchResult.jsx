import React, { useEffect, useState } from "react";
import Cards from "./Cards";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { addBlogs, setLoading } from "../redux/slices/SearchResultSlice";
import axios from "axios";
import BaseUrl from "../utils/BaseUrl";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";

const SearchResult = () => {
  const dispatch = useDispatch();
  const { blogs, loading } = useSelector((state) => state.searchResult);
  const [query, setQuery] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const newQuery = queryParams.get("query")?.toLowerCase() || "";

  useEffect(() => {
    if (query !== newQuery) {
      setQuery(newQuery);
    }
  }, [newQuery, query]);

  useEffect(() => {
    const fetchBlogsByTag = async () => {
      if (query) {
        dispatch(setLoading(true));
        try {
          const response = await axios.get(
            `${BaseUrl}/blog/searchResults/${query}`
          );
          dispatch(addBlogs(response.data.searchResults));
        } catch (error) {
          // console.error("Error fetching blogs:", error);
        } finally {
          dispatch(setLoading(false));
        }
      }
    };

    // Debounce the API call
    const debounceFetch = setTimeout(() => {
      fetchBlogsByTag();
    }, 300);

    return () => clearTimeout(debounceFetch);
  }, [query, dispatch]);
  return (
    <div className="">
      <Navbar />
      <div className="w-11/12 mx-auto mt-24 min-h-[720px]">
        {blogs && blogs.length > 0 ? (
          <div>
            <p className="my-4 text-lg font-bold text-indigo-500">
              Showing results for "{query}"
            </p>
            <div>
              <Cards blogs={blogs} loading={loading} />
            </div>
          </div>
        ) : (
          <h1 className="text-indigo-500 text-2xl grid place-items-center h-[530px]">
            No blogs found related to "{query}"
          </h1>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SearchResult;
