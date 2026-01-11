import React from "react";
import heroImg from "../assets/hero-football.jpg";

const Hero = () => {
  return (
    <section
      id="home"
      className="hero-section text-white text-center d-flex align-items-center justify-content-center"
      style={{ backgroundImage: `url(${heroImg}) `}}
    >
      <div className="overlay"></div>
      <div className="container position-relative">
        <h1 className="display-3 fw-bold text-shadow">
          Welcome to Lerrykay House of Football
        </h1>
        <p className="lead mt-3 mb-4">
          The Home of Football Stories, Passion, and Glory.
        </p>
        <a href="#news" className="btn btn-danger btn-lg">
          Explore News
        </a>
      </div>
    </section>
  );
};

export default Hero;