import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!user || user.role !== "admin") {
    return <p className="text-danger mt-4">Access denied. Admins only.</p>;
  }

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState([]);
  const [editingPostId, setEditingPostId] = useState(null); 
  const [editMode, setEditMode] = useState(false); 

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5005/api/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) {
      setMessage("Title and content are required.");
      return;
    }

    try {
      let data;
      const headers = { Authorization: `Bearer ${token}` };

      if (imageFile) {
        data = new FormData();
        data.append("title", title);
        data.append("content", content);
        data.append("image", imageFile);
      } else if (imageUrl) {
        data = { title, content, image: imageUrl };
      } else {
        data = { title, content };
      }

      const res = await axios.post(
        "http://localhost:5005/api/admin/posts",
        data,
        {
          headers: imageFile
            ? {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              }
            : { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(res.data.message);
      setTitle("");
      setContent("");
      setImageFile(null);
      setImageUrl("");
      fetchPosts();
    } catch (err) {
      console.error("Admin Post Error:", err.response || err);
      setMessage(err.response?.data?.message || "Failed to create post");
    }
  };

  
  const handleDelete = async (postId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await axios.delete(`http://localhost:5005/api/admin/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage("Post deleted successfully");
      fetchPosts();
    } catch (err) {
      console.error("Delete Post Error:", err.response || err);
      setMessage(err.response?.data?.message || "Failed to delete post");
    }
  };

  
  const handleEdit = (post) => {
    setTitle(post.title);
    setContent(post.content);
    setImageUrl(post.image || "");
    setImageFile(null);
    setEditingPostId(post._id);
    setEditMode(true);
  };

  
  const handleUpdate = async () => {
    if (!title || !content) {
      setMessage("Title and content are required.");
      return;
    }

    try {
      let data;
      if (imageFile) {
        data = new FormData();
        data.append("title", title);
        data.append("content", content);
        data.append("image", imageFile);
      } else if (imageUrl) {
        data = { title, content, image: imageUrl };
      } else {
        data = { title, content };
      }

      await axios.put(
        `http://localhost:5005/api/admin/posts/${editingPostId}`,
        data,
        {
          headers: imageFile
            ? {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
              }
            : { Authorization: `Bearer ${token}` },
        }
      );

      setMessage("Post updated successfully");
      setTitle("");
      setContent("");
      setImageFile(null);
      setImageUrl("");
      setEditMode(false);
      setEditingPostId(null);
      fetchPosts();
    } catch (err) {
      console.error("Update Post Error:", err.response || err);
      setMessage(err.response?.data?.message || "Failed to update post");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-danger">Admin Dashboard</h2>
      {message && <div className="alert alert-info">{message}</div>}

      <div className="card shadow-sm mb-5">
        <div className="card-header bg-danger text-white">
          <h5>Create New Post</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Post Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Content</label>
              <textarea
                className="form-control"
                rows="4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Upload Image or Cloudinary URL
              </label>
              <input
                type="file"
                className="form-control mb-2"
                onChange={(e) => setImageFile(e.target.files[0])}
              />
              <input
                type="text"
                placeholder="Cloudinary Image URL"
                className="form-control"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
            <div className="d-flex">
              <button
                type="button"
                className={`btn ${editMode ? "btn-primary" : "btn-success"}`}
                onClick={editMode ? handleUpdate : handleSubmit}
              >
                {editMode ? "Update Post" : "Create Post"}
              </button>

              {editMode && (
                <button
                  type="button"
                  className="btn btn-secondary ms-2"
                  onClick={() => {
                    setEditMode(false);
                    setEditingPostId(null);
                    setTitle("");
                    setContent("");
                    setImageFile(null);
                    setImageUrl("");
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <h4 className="mb-3 text-secondary">Existing Posts</h4>
      <div className="row">
        {posts.map((post) => (
          <div key={post._id} className="col-md-6 mb-4">
            <div className="card shadow-sm h-100">
              {post.image && (
                <img
                  src={post.image}
                  className="card-img-top"
                  alt={post.title}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.content}</p>

                <div className="d-flex justify-content-end mb-2">
                  <button
                    className="btn btn-sm btn-danger me-2"
                    onClick={() => handleDelete(post._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleEdit(post)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
