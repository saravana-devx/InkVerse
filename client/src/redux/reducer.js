import { combineReducers } from "@reduxjs/toolkit";
import searchResultReducer from "./slices/SearchResultSlice";
import authSlice from "./slices/authSlice";
import paginationSlice from "./slices/paginationSlice";
import blogSlice from "./slices/blogSlice";

const rootReducer = combineReducers({
  searchResult: searchResultReducer,
  auth: authSlice,
  page: paginationSlice,
  blog: blogSlice,
});

export default rootReducer;
