import React, { useState } from "react";
import { withRouter, Link, Redirect } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Input, Button, Checkbox, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";

import "./SignIn.css";
import { signInUser } from "../../../actions/userActions";

const SignIn = (props) => {
  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const [username, setUsername] = useState("");
  const [rememberMe, setRememberMe] = useState(rememberMeChecked);
  const userSignIn = useSelector((state) => state.userSignIn);
  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };
  if (userSignIn.result) {
    if (userSignIn.result.loginSuccess) {
      if (rememberMe === true) {
        localStorage.setItem("rememberMe", username);
      } else {
        localStorage.removeItem("rememberMe");
      }
      return <Redirect to="/" />;
    }
  }

  const initialUsername = localStorage.getItem("rememberMe")
    ? localStorage.getItem("rememberMe")
    : "";
  return (
    <Formik
      initialValues={{
        username: initialUsername,
        password: "",
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string()
          .min(5, "Username must be 5 character")
          .required("Username is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        let dataToSubmit = {
          username: values.username,
          password: values.password,
        };
        dispatch(signInUser(dataToSubmit));
        setSubmitting(false);
        setUsername(values.username);
      }}
    >
      {(props) => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        } = props;
        return (
          <div className="app">
            {userSignIn.loading ? (
              <div style={{ textAlign: "center", marginBottom: "180px" }}>
                <Spin tip="Loading..." size="large" loading="true" />
              </div>
            ) : (
              <React.Fragment>
                <h1 style={{ marginBottom: "30px" }}>SIGN IN</h1>
                {userSignIn.result && !userSignIn.result.loginSuccess ? (
                  <h2 style={{ textAlign: "center", color: "red" }}>
                    {userSignIn.result.error}
                  </h2>
                ) : null}
                {userSignIn.error !== undefined &&
                userSignIn.error.response !== undefined ? (
                  <h2 style={{ textAlign: "center", color: "red" }}>
                    {userSignIn.error.response.data.error}
                  </h2>
                ) : null}
                {userSignIn.error !== undefined &&
                userSignIn.error.response === undefined ? (
                  <h2 style={{ textAlign: "center", color: "red" }}>
                    {userSignIn.error.message}
                  </h2>
                ) : null}

                <form
                  onSubmit={handleSubmit}
                  style={{
                    width: "300px",
                    marginBottom: "200px",
                    fontWeight: "bold",
                    marginRight: "20px",
                  }}
                >
                  <Form.Item required label="Username">
                    <Input
                      id="username"
                      placeholder="Enter your username"
                      type="text"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.username && touched.username
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.username && touched.username && (
                      <div className="input-feedback">{errors.username}</div>
                    )}
                  </Form.Item>

                  <Form.Item required label="Password">
                    <Input
                      id="password"
                      placeholder="Enter your password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.password && touched.password
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.password && touched.password && (
                      <div className="input-feedback">{errors.password}</div>
                    )}
                  </Form.Item>

                  <Form.Item>
                    <Checkbox
                      id="rememberMe"
                      onChange={handleRememberMe}
                      checked={rememberMe}
                    >
                      Remember me
                    </Checkbox>
                    <div>
                      <br />
                      <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        style={{ minWidth: "100%" }}
                        disabled={isSubmitting}
                        onSubmit={handleSubmit}
                      >
                        Log in
                      </Button>
                    </div>
                    Or <Link to="/register">register now!</Link>
                  </Form.Item>
                </form>
              </React.Fragment>
            )}
          </div>
        );
      }}
    </Formik>
  );
};

export default withRouter(SignIn);
