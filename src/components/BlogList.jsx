import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentForm from "./CommentForm";
import Navbar from "./Navbar"; 

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [readMorePosts, setReadMorePosts] = useState({}); 

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:5005/api/posts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    } catch (err) {
      console.error("Fetch posts error:", err.response || err);
      setError(err.response?.data?.message || "Failed to fetch posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      await axios.post(
        `http://localhost:5005/api/posts/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchPosts();
    } catch (err) {
      console.error("Like error:", err.response || err);
      alert(err.response?.data?.message || "Failed to like post");
    }
  };

  
  const topTeams = [
    {
      league: "Premier League",
      teams: ["Man City", "Arsenal", "Man Utd", "Newcastle", "Liverpool"],
    },
    {
      league: "La Liga",
      teams: [
        "Barcelona",
        "Real Madrid",
        "Atletico",
        "Real Sociedad",
        "Sevilla",
      ],
    },
    {
      league: "Bundesliga",
      teams: ["Bayern", "Dortmund", "Leverkusen", "RB Leipzig", "Union Berlin"],
    },
    {
      league: "Serie A",
      teams: ["Napoli", "Juventus", "Inter", "AC Milan", "Lazio"],
    },
    {
      league: "Ligue 1",
      teams: ["Paris SG", "Marseille", "Nice", "Monaco", "Lens"],
    },
  ];

  return (
    <>
      <Navbar />

      <div className="container mt-5">
        <h2 className="mb-4 text-danger">Latest</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row">
          { }
          <div className="col-lg-8">
            {posts.length === 0 ? (
              <p className="text-center">No posts available.</p>
            ) : (
              posts.map((post) => {
                const liked = post.likes?.some((id) => id === user?._id);
                const readMore = readMorePosts[post._id] || false;

                return (
                  <div key={post._id} className="card mb-4 shadow-sm">
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="card-img-top"
                        style={{ objectFit: "cover", maxHeight: "400px" }}
                      />
                    )}
                    <div className="card-body">
                      <h5 className="card-title fw-bold">{post.title}</h5>
                      <div className="d-flex align-items-center text-muted small mb-2">
                        <span className="me-3">
                          👤 {post.author?.firstName} {post.author?.lastName}
                        </span>
                        <span>
                          🕒 {new Date(post.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="card-text">
                        {readMore
                          ? post.content
                          : post.content.substring(0, 250) +
                            (post.content.length > 250 ? "..." : "")}{" "}
                        {post.content.length > 250 && (
                          <span
                            onClick={() =>
                              setReadMorePosts((prev) => ({
                                ...prev,
                                [post._id]: !prev[post._id],
                              }))
                            }
                            className="text-danger fw-bold"
                            style={{ cursor: "pointer" }}
                          >
                            {readMore ? "Show less" : "Read more"}
                          </span>
                        )}
                      </p>

                      { }
                      <button
                        className={`btn ${
                          liked ? "btn-secondary" : "btn-danger"
                        } mb-3`}
                        onClick={() => handleLike(post._id)}
                        disabled={liked}
                      >
                        ❤️ {post.likes?.length || 0}
                      </button>

                      { }
                      <div>
                        <h6 className="text-muted">Comments:</h6>
                        {post.comments && post.comments.length > 0 ? (
                          <ul className="list-unstyled mb-2">
                            {post.comments.slice(0, 3).map((comment) => (
                              <li key={comment._id} className="mb-1">
                                <strong>{comment.user.firstName}:</strong>{" "}
                                {comment.text}
                              </li>
                            ))}
                            {post.comments.length > 3 && (
                              <li>...more comments</li>
                            )}
                          </ul>
                        ) : (
                          <p className="text-muted mb-2">No comments yet.</p>
                        )}
                        <CommentForm
                          postId={post._id}
                          onCommentAdded={fetchPosts}
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          { }
          <div className="col-lg-4">
            <h4 className="text-danger mb-3">Top 5 Teams in Europe</h4>
            {topTeams.map((league, index) => (
              <div key={index} className="card mb-3 shadow-sm">
                <div className="card-header bg-danger text-white fw-bold">
                  {league.league}
                </div>
                <ul className="list-group list-group-flush">
                  {league.teams.map((team, i) => (
                    <li key={i} className="list-group-item">
                      {i + 1}. {team}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      { }
      <style>{`
  body {
    background: linear-gradient(to right, #f5f7fa, #e4e9f0);
  }

  .card {
    border-radius: 10px;
    background-color: #ffffff;
    box-shadow: 0 4px 10px rgba(0,0,0,0.08);
  }

  .card-header {
    background-color: #2c3e50;
    color: #ffffff;
  }

  .btn-danger {
    background-color: #c0392b;
    border: none;
  }

  .btn-danger:hover {
    background-color: #e74c3c;
  }

  h2, h4 {
    color: #1f2a44;
  }

  .text-danger {
    color: #c0392b !important;
  }

  .list-group-item {
    background-color: #f9f9f9;
  }
`}</style>
    </>
  );
};

export default BlogList;
