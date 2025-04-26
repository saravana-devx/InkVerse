import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogId: null,
  },
  reducers: {
    setBlogId(state, action) {
      state.blogId = action.payload;
    },
  },
});

export const { setBlogId } = blogSlice.actions;

export default blogSlice.reducer;
