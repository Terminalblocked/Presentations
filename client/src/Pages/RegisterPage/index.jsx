import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterPage.scss";
import { useDispatch, useSelector } from "react-redux";
import { checkIsAuth, registerUser } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

export const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);
  const isAuth = useSelector(checkIsAuth);
  
  
  useEffect(() => {
    if (status) {
      toast(status);
    }
    if (isAuth) {
      navigate("/");
    }
  }, [status, isAuth, navigate]);

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      dispatch(registerUser({ username, password }));
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="register-box">
      <div className="form">
        <h1>Registration</h1>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="username"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
          <button type="submit">register</button>
          <div className="message">
            Already have account?{" "}
            <Link to={"/login"} href="#">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
