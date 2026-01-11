import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ showAuth = true }) => {
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4 text-danger" to="/">
          Lerrykay House of Football
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/news">
                News
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/transfers">
                Transfers
              </Link>
            </li>
          </ul>

          {}
          {showAuth && !isLoggedIn && (
            <button
              className="btn btn-outline-danger ms-3"
              data-bs-toggle="modal"
              data-bs-target="#loginModal"
            >
              Sign In
            </button>
          )}

          {showAuth && isLoggedIn && (
            <button
              className="btn btn-outline-light ms-3"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
