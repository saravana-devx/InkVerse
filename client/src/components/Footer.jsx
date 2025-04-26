import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-gray-900 text-white py-10 px-6 border-t-2 border-gray-700">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 text-center sm:text-left">
        {/* About Section */}
        <div>
          <h2 className="text-lg font-semibold mb-3">About</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos ipsam
            officia consequatur atque facere doloribus molestiae necessitatibus?
          </p>
          <div className="mt-4 space-y-1 text-gray-300 text-sm">
            <p>
              <span className="font-semibold">Email:</span> inkverse@gmail.com
            </p>
            <p>
              <span className="font-semibold">Phone:</span> +91 123-123-1234
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Quick Links</h2>
          <ul className="space-y-2">
            <li
              className="cursor-pointer hover:text-indigo-400"
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className="cursor-pointer hover:text-indigo-400"
              onClick={() => navigate("/pagination")}
            >
              Explore Blog
            </li>
            <li
              className="cursor-pointer hover:text-indigo-400"
              onClick={() => navigate("/createBlog")}
            >
              Create Blog
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-gray-700 pt-6 text-center sm:flex sm:justify-between sm:items-center">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} The Blog. All Rights Reserved.
        </p>
        <ul className="flex justify-center sm:justify-end gap-x-6 mt-4 sm:mt-0 text-gray-400 text-sm">
          <li className="cursor-pointer hover:text-indigo-400">Terms of Use</li>
          <li className="cursor-pointer hover:text-indigo-400">
            Privacy Policy
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
