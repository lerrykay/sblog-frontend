import React from "react";

const MainFooter = () => {
  return (
    <footer className="bg-dark text-light pt-5 pb-4 mt-auto">
      <div className="container">
        <div className="row text-center text-md-start">
          { }
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold text-danger">Lerrykay House of Football</h4>
            <p className="mt-3">
              Your daily dose of football updates, insights, and exclusive
              stories — powered by passion for the beautiful game.
            </p>
          </div>

          { }
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold text-danger">Quick Links</h5>
            <ul className="list-unstyled mt-3">
              <li className="mb-2">
                <a
                  href="#home"
                  className="text-light text-decoration-none hover-effect"
                >
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#news"
                  className="text-light text-decoration-none hover-effect"
                >
                  Latest News
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#about"
                  className="text-light text-decoration-none hover-effect"
                >
                  About
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="#contact"
                  className="text-light text-decoration-none hover-effect"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          { }
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold text-danger">Get in Touch</h5>
            <ul className="list-unstyled mt-3">
              <li className="mb-2">📍 Lagos, Nigeria</li>
              <li className="mb-2">📧 info@lerrykayfootball.com</li>
              <li className="mb-2">📞 +234 800 123 4567</li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary" />

        <div className="text-center mt-3">
          <p className="mb-0 small">
            ©{new Date().getFullYear()}{" "}
            <strong>Lerrykay House of Football</strong> | All Rights Reserved ⚽
          </p>
        </div>
      </div>

      <style>{`
        .hover-effect:hover {
          color: #dc3545 !important;
          transition: color 0.3s ease;
        }
      `}</style>
    </footer>
  );
};

export default MainFooter;
