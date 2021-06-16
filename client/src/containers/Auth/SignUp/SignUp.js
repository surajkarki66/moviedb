import React from "react";
import moment from "moment";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Form, Input, Button } from "antd";

import { registerUser } from "../../../actions/userActions";

const formItemLayout = {
  labelCol: {
    xs: { span: 34 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const loaderCSS = css`
  margin-top: 50px;
  margin-bottom: 25px;
`;

const SignUp = (props) => {
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const loading = userRegister.loading;
  const register = userRegister.register;
  if (register) {
    if (register.success) {
      props.history.push("/login");
    }
  }
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string()
          .min(5, "Minimum 5 characters required.")
          .required("Username is required"),
        password: Yup.string()
          .min(8, "Password must be at least 8 characters")
          .required("Password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required"),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            username: values.username,
            password: values.password,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
          };

          dispatch(registerUser(dataToSubmit));

          setSubmitting(false);
        }, 500);
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
            {loading ? (
              <ClipLoader css={loaderCSS} size={150} loading />
            ) : (
              <React.Fragment>
                {" "}
                <h1 style={{ marginBottom: "20px" }}>SIGN UP</h1>
                {userRegister.error !== undefined &&
                userRegister.error.response === undefined ? (
                  <h2 style={{ textAlign: "center", color: "red" }}>
                    {userRegister.error.message}
                  </h2>
                ) : null}
                {userRegister.error ? (
                  <h2 style={{ textAlign: "center", color: "red" }}>
                    {userRegister.error.response.data.error}
                  </h2>
                ) : null}
                <Form
                  style={{
                    minWidth: "205px",
                    marginBottom: "150px",
                    fontWeight: "bold",
                  }}
                  {...formItemLayout}
                  onSubmit={handleSubmit}
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

                  <Form.Item
                    required
                    label="Password"
                    hasFeedback
                    validateStatus={
                      errors.password && touched.password ? "error" : "success"
                    }
                  >
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

                  <Form.Item required label="Confirm" hasFeedback>
                    <Input
                      id="confirmPassword"
                      placeholder="Enter your confirmPassword"
                      type="password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.confirmPassword && touched.confirmPassword
                          ? "text-input error"
                          : "text-input"
                      }
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <div className="input-feedback">
                        {errors.confirmPassword}
                      </div>
                    )}
                  </Form.Item>

                  <Form.Item {...tailFormItemLayout}>
                    <Button
                      onClick={handleSubmit}
                      type="primary"
                      disabled={isSubmitting}
                      style={{ marginTop: "20px" }}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </React.Fragment>
            )}
          </div>
        );
      }}
    </Formik>
  );
};

export default SignUp;
