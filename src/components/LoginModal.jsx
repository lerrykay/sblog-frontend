import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const LoginModal = () => {
  const navigate = useNavigate(); 

  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (
    values,
    { setSubmitting, setStatus, resetForm }
  ) => {
    try {
      const res = await axios.post(
        "http://localhost:5005/api/users/login",
        values
      );

      
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setStatus({ success: res.data.message });
      resetForm();

      
      const modalEl = document.getElementById("loginModal");
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal.hide();

      
      navigate("/blog");
    } catch (err) {
      setStatus({ error: err.response?.data?.message || "Server error" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="modal fade"
      id="loginModal"
      tabIndex="-1"
      aria-labelledby="loginModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content border-0 shadow-lg rounded-4">
          <div className="modal-header bg-danger text-white">
            <h5 className="modal-title fw-bold" id="loginModalLabel">
              Sign In
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

                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-danger px-4"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Logging in..." : "Sign In"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          <div className="modal-footer justify-content-center">
            <p className="text-muted small mb-0">
              Don’t have an account?{" "}
              <a
                href="#"
                className="text-danger fw-bold text-decoration-none"
                data-bs-toggle="modal"
                data-bs-target="#signupModal"
              >
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
