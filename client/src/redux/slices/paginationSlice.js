import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    blogs: [],
    totalDocuments: 0,
    pageNo: 1,
    limit: 6,
    loading: false,
  },
  reducers: {
    setBlogs(state, action) {
      state.blogs = action.payload;
    },
    setPageNo(state, action) {
      state.pageNo = action.payload;
    },
    setLimit(state, action) {
      state.limit = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setTotalDocuments(state, action) {
      state.totalDocuments = action.payload;
    },
  },
});

export const { setBlogs, setPageNo, setLimit, setLoading, setTotalDocuments } =
  paginationSlice.actions;

export default paginationSlice.reducer;
