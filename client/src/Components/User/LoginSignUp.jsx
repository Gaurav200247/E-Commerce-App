import React, { useEffect, useState } from "react";
import "./LoginSignUp.css";
import Loading from "../Layouts/Loader/Loading";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors } from "../../Actions/UserAction";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const LoginSignUp = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [Tab, setTab] = useState("login");

  const redirect = location.search ? location.search.split("=")[1] : "/account";

  useEffect(() => {
    if (error === "Please Login to Access this Route...") {
      dispatch(clearErrors());
    }
    if (error && error !== "Please Login to Access this Route...") {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }
  }, [isAuthenticated, navigate, redirect]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="login-signup-container">
            <div className="login-signup-box">
              <div className="login-signup-toggle">
                <p
                  onClick={() => setTab("register")}
                  className={`tab-btn w-4/6 ${
                    Tab === "register" && "under-line"
                  }`}
                >
                  Register
                </p>
                <p
                  onClick={() => setTab("login")}
                  className={`tab-btn w-4/6 ${Tab === "login" && "under-line"}`}
                >
                  Login
                </p>
              </div>
              {Tab === "login" && <LoginForm />}
              {Tab === "register" && <RegisterForm />}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LoginSignUp;
