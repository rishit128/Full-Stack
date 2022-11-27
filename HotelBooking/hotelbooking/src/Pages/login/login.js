import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "./style.css";
import { useState } from "react";
import * as api from "../../api/index.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userData } from "../../Store/user/userSlice.js";
import Errortoast from "../../components/Errortoast";
const loginInfo = {
  email: "",
  password: "",
};
const Login = () => {
  const [login, setlogin] = useState(loginInfo);
  const [error, seterror] = useState("");
  const { email, password } = login;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setlogin({ ...login, [name]: value });
  };
  const loginSubmit = async () => {
    try {
      seterror("");
      const { data } = await api.signIn({
        email,
        password,
      });
      console.log(data);
      localStorage.setItem("profile", JSON.stringify(data));
      dispatch(userData(data));
      navigate("/");
    } catch (error) {
      console.log(error.response.data);
      seterror(error.response.data);
    }
  };
  const loginvalidation = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("Must be a valid email.")
      .max(100),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more than 36 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#/$%/^&/*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  });
  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          {error && <Errortoast showstate={true} message={error} />}
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password,
            }}
            validationSchema={loginvalidation}
            onSubmit={() => {
              loginSubmit();
            }}
          >
            {({ errors, touched }) => (
              <Form className="login">
                <div className="login__field">
                  <i className="login__icon fas fa-user"></i>
                  <Field
                    type="email"
                    className="login__input"
                    placeholder="Email"
                    id="email"
                    name="email"
                    onChange={handleLoginChange}
                  />
                  {errors.email && touched.email ? (
                    <div
                      style={{
                        color: "red",
                      }}
                    >
                      {errors.email}
                    </div>
                  ) : null}
                </div>
                <div className="login__field">
                  <i className="login__icon fas fa-lock"></i>
                  <Field
                    type="password"
                    className="login__input"
                    placeholder="Password"
                    id="password"
                    name="password"
                    onChange={handleLoginChange}
                  />

                  {errors.password && touched.password ? (
                    <div
                      style={{
                        color: "red",
                      }}
                    >
                      {errors.password}
                    </div>
                  ) : null}
                </div>
                <button className="button login__submit">
                  <span className="button__text">Log In Now</span>
                  <i className="button__icon fas fa-chevron-right"></i>
                </button>
              </Form>
            )}
          </Formik>

          {/* <div className="social-login">
            <h3>log in via</h3>
            <div className="social-icons">
              <a href="#" className="social-login__icon fab fa-instagram"></a>
              <a href="#" className="social-login__icon fab fa-facebook"></a>
              <a href="#" className="social-login__icon fab fa-twitter"></a>
            </div>
          </div> */}
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
