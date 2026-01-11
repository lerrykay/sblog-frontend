import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom"; 

const SignupModal = () => {
  const navigate = useNavigate(); 

  const initialValues = {
    firstName: "",
    lastName: "",
    dob: "",
    email: "",
    password: "",
    favoriteClub: "",
    favoritePlayer: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    dob: Yup.date().required("Date of birth is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    favoriteClub: Yup.string(),
    favoritePlayer: Yup.string(),
  });

  const handleSubmit = async (
    values,
    { setSubmitting, setStatus, resetForm }
  ) => {
    try {
      const res = await axios.post("http://localhost:5005/api/users/signup", values);

      
      localStorage.setItem("token", res.data.token || "dummy-token");
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setStatus({ success: res.data.message });
      resetForm();

      
      const modalEl = document.getElementById("signupModal");
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal.hide();

      
      const loginModalEl = document.getElementById("loginModal");
      const loginModal = new bootstrap.Modal(loginModalEl);
      loginModal.show();
    } catch (err) {
      setStatus({ error: err.response?.data?.message || "Server error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="modal fade"
      id="signupModal"
      tabIndex="-1"
      aria-labelledby="signupModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4">
          <div className="modal-header bg-danger text-white">
            <h5 className="modal-title fw-bold" id="signupModalLabel">
              Create an Account
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body p-4">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, status }) => (
                <Form>
                  {status?.success && (
                    <div className="alert alert-success">{status.success}</div>
                  )}
                  {status?.error && (
                    <div className="alert alert-danger">{status.error}</div>
                  )}

                  {  }
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor="firstName"
                        className="form-label fw-semibold"
                      >
                        First Name
                      </label>
                      <Field
                        type="text"
                        name="firstName"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="text-danger small"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label
                        htmlFor="lastName"
                        className="form-label fw-semibold"
                      >
                        Last Name
                      </label>
                      <Field
                        type="text"
                        name="lastName"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="text-danger small"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="dob" className="form-label fw-semibold">
                      Date of Birth
                    </label>
                    <Field type="date" name="dob" className="form-control" />
                    <ErrorMessage
                      name="dob"
                      component="div"
                      className="text-danger small"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">
                      Email
                    </label>
                    <Field type="email" name="email" className="form-control" />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger small"
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="password"
                      className="form-label fw-semibold"
                    >
                      Password
                    </label>
                    <Field
                      type="password"
                      name="password"
                      className="form-control"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger small"
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="favoriteClub"
                      className="form-label fw-semibold"
                    >
                      Favorite Football Club
                    </label>
                    <Field
                      type="text"
                      name="favoriteClub"
                      className="form-control"
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="favoritePlayer"
                      className="form-label fw-semibold"
                    >
                      Favorite Player
                    </label>
                    <Field
                      type="text"
                      name="favoritePlayer"
                      className="form-control"
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-danger px-4"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Signing up..." : "Sign Up"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          <div className="modal-footer justify-content-center">
            <p className="text-muted small mb-0">
              Already have an account?{" "}
              <a
                href="#"
                className="text-danger fw-bold text-decoration-none"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
              >
                Sign in here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
