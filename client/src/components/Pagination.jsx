import React, { useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";
import BaseUrl from "../utils/BaseUrl";
import { useDispatch, useSelector } from "react-redux";
import {
  setBlogs,
  setPageNo,
  setLoading,
  setTotalDocuments,
} from "../redux/slices/paginationSlice";

export default function Pagination() {
  const dispatch = useDispatch();

  const { totalDocuments, pageNo, limit } = useSelector((state) => state.page);
  const totalPages = Math.ceil(totalDocuments / limit);

  const handlePreviousPage = () => {
    if (pageNo > 1) {
      dispatch(setPageNo(pageNo - 1));
    }
  };

  const handleNextPage = () => {
    if (pageNo < totalPages) {
      dispatch(setPageNo(pageNo + 1));
    }
  };

  useEffect(() => {
    const fetchPageDetails = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get(
          `${BaseUrl}/blog/pageDetails/?page=${pageNo}&limit=${limit}`
        );
        dispatch(setBlogs(response.data.results.blogs));
        dispatch(setTotalDocuments(response.data.results.totalDocument));
      } catch (error) {
        // console.error("Error fetching page details:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchPageDetails();
  }, [pageNo, limit, dispatch]);

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${
            pageNo === i ? "bg-indigo-600 text-white" : ""
          }`}
          onClick={() => dispatch(setPageNo(i))}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="w-full flex flex-col sm:flex-row items-center justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{(pageNo - 1) * limit + 1}</span> to{" "}
            <span className="font-medium">{Math.min(pageNo * limit, totalDocuments)}</span> of{" "}
            <span className="font-medium">{totalDocuments}</span> results
          </p>
        </div>
        <div className="my-4">
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={handlePreviousPage}
              disabled={pageNo === 1}
              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${pageNo === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              <span className="sr-only">Previous</span>
              <FaChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            {getPageNumbers()}
            <button
              onClick={handleNextPage}
              disabled={pageNo === totalPages}
              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${pageNo === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              <span className="sr-only">Next</span>
              <FaChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
