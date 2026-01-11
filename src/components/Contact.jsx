import React from "react";

const Contact = () => {
  return (
    <section className="contact-section py-5">
      <div className="container">
        <h2 className="text-center mb-4 fw-bold text-light">Contact Us</h2>
        <p className="text-center text-light mb-5">
          Have a question, suggestion, or collaboration idea? Reach out to
          Lerrykay House of Football today.
        </p>

        <div className="row justify-content-center">
          <div className="col-md-8">
            <form className="contact-form p-4 shadow-lg rounded-4 bg-light">
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-semibold">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="message" className="form-label fw-semibold">
                  Message
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  rows="4"
                  placeholder="Write your message here..."
                  required
                ></textarea>
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-primary px-4">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
