import React from "react";

const About = () => {
  return (
    <section
      id="about"
      className="py-5 bg-light text-center position-relative overflow-hidden"
    >
      { }
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(220,53,69,0.05), transparent 60%)",
          zIndex: 0,
        }}
      ></div>

      <div className="container position-relative" style={{ zIndex: 2 }}>
        <h2 className="fw-bold text-danger mb-4 display-6">
          About Lerrykay House of Football
        </h2>

        <p
          className="lead text-secondary mx-auto mb-4"
          style={{ maxWidth: "750px" }}
        >
          At{" "}
          <span className="text-danger fw-semibold">
            Lerrykay House of Football
          </span>
          , we don’t just talk football — we celebrate it. From matchday stories
          and transfer buzz to in-depth analyses and fan culture, we bring every
          heartbeat of the beautiful game closer to you.
        </p>

        <div className="row justify-content-center mt-5">
          <div className="col-md-4 mb-4">
            <div className="card shadow border-0 rounded-4 h-100">
              <div className="card-body">
                <h5 className="fw-bold text-danger">Our Vision</h5>
                <p className="text-muted mt-3">
                  To become Africa’s most trusted source for authentic football
                  news, passion-driven storytelling, and community engagement.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow border-0 rounded-4 h-100">
              <div className="card-body">
                <h5 className="fw-bold text-danger">Our Mission</h5>
                <p className="text-muted mt-3">
                  To inspire football lovers by sharing stories that capture the
                  spirit, drama, and joy of the game we all love.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        #about {
          animation: fadeInUp 1.2s ease-in-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .card:hover {
          transform: translateY(-5px);
          transition: 0.3s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default About;
