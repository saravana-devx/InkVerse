import React, { useEffect, useState } from "react";
import axios from "axios";
import BaseUrl from "../utils/BaseUrl";
import { GiPlayButton } from "react-icons/gi";
import formatDate from "../utils/formatDate";
import { useSelector } from "react-redux";
import toast from "react-simple-toasts";

const Comment = ({ slug }) => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BaseUrl}/comment/${slug}`);
        setComments(response.data.comments);
      } catch (error) {
        // console.error("Error while fetching comments", error);
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [slug]);

  const { user } = useSelector((state) => state.auth) || {}; // Get user data from Redux

  const postComment = async () => {
    if (loggedIn) {
      if (!newComment.trim()) return;
      try {
        const token = localStorage.getItem("user");

        const response = await axios.post(
          `${BaseUrl}/comment/addComment/${slug}`,
          { commentDescription: newComment },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const newCommentData = {
          ...response.data.comment,
          user: {
            _id: user?._id,
            name: user?.firstName + " " + user?.lastName,
            image: user?.image || "/default-avatar.png",
          },
        };

        setComments([newCommentData, ...comments]);
        setNewComment("");
      } catch (error) {
        // console.error("Error while posting comment", error);
      }
    } else {
      toast("Log In to comment");
    }
  };

  return (
    <div className="mt-12 max-w-2xl mx-auto px-4">
      <h1 className="font-bold text-xl mb-4">Comments</h1>
      {/* Comment Input */}
      <div className="relative">
        <input
          onChange={(e) => setNewComment(e.target.value)}
          className="outline-none w-full border-b-2 border-indigo-500 h-10 py-2 px-4 bg-gray-100 rounded"
          placeholder="Add a comment..."
          value={newComment}
          name="comment"
        />
        <button
          className="absolute right-3 bottom-2.5 hover:scale-110 transition"
          onClick={postComment}
        >
          <GiPlayButton size={24} color="indigo" />
        </button>
      </div>

      {/* Comment List */}
      <div className="mt-6 space-y-4">
        {loading ? (
          <p className="text-gray-500">Loading comments...</p>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment._id}
              className="p-4 border rounded-lg shadow-sm bg-white"
            >
              <div className="flex items-center gap-3 mb-2">
                <img
                  className="rounded-full w-10 h-10 border border-gray-300"
                  src={comment.user?.image || "/default-avatar.png"}
                  alt="User avatar"
                />
                <div className="flex  justify-start items-center gap-x-4">
                  <p className="text-sm font-semibold">
                    {comment.user?.firstName} {comment.user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(comment.createdAt).date}
                  </p>
                </div>
              </div>
              <p className="text-gray-800">{comment.commentDescription}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
};

export default Comment;
