import { createSlice } from "@reduxjs/toolkit";

export const searchResultsSlice = createSlice({
  name: "searchResults",
  initialState: {
    blogs: [], // Wrap the array in an object to avoid the warning
    loading: true,
  },
  reducers: {
    addBlogs: (state, action) => {
      // Update state.blogs based on the action payload
      state.blogs = action.payload;
    },
    setLoading: (state, action) => {
      // Update the loading state
      state.loading = action.payload;
    },
  },
});

export const { addBlogs, setLoading } = searchResultsSlice.actions;
export default searchResultsSlice.reducer;
