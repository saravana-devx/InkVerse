import "./App.css";
import { Routes, Route} from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home";
import { LoginPage, SignUpPage } from "./pages/Auth";
import BlogCreation from "./pages/BlogCreation";
import BlogPost from "./pages/BlogPost";
import SearchResult from "./components/SearchResult";
import DashBoard from "./pages/DashBoard";
import BlogListWithPagination from "./pages/BlogListWithPagination";

import { useDispatch, useSelector } from "react-redux";
import { setLoggedIn, setUserDetails } from "./redux/slices/authSlice";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import EditBlog from "./pages/EditBlog";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && isLoggedIn) {
      dispatch(setUserDetails(user));
      dispatch(setLoggedIn(true));
    }
  }, [dispatch, user, isLoggedIn]);



  return (
    <div className="h-screen w-screen overflow-x-hidden">
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResult />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/writeBlog" element={<BlogCreation />} />
          <Route path="/blog" element={<BlogPost />} />
          <Route path="/editBlog" element={<EditBlog />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/pagination" element={<BlogListWithPagination />} />
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/edit-profile" element={<EditProfile />}></Route>
        </Routes>
    </div>
  );
}

export default App;
