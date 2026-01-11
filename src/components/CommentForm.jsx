import React, { useState } from "react";
import axios from "axios";

const CommentForm = ({ postId, onCommentAdded }) => {
  const [commentText, setCommentText] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText) return;

    try {
      await axios.post(
        `http://localhost:5005/api/posts/${postId}/comment`,
        { text: commentText }, 
        {
          headers: { Authorization: `Bearer ${token}` }, 
        }
      );
      setCommentText(""); 
      onCommentAdded(); 
    } catch (err) {
      console.error("Comment error:", err.response || err);
      alert(err.response?.data?.message || "Failed to post comment");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex mt-2">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Write a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">
        Comment
      </button>
    </form>
  );
};

export default CommentForm;