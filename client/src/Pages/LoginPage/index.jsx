import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./LoginPage.scss";
import { toast } from "react-toastify";
import { checkIsAuth, loginUser } from "../../redux/features/auth/authSlice";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth);
  const isAuth = useSelector(checkIsAuth);

  console.log(status)
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
      dispatch(loginUser({ username, password }));
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-box">
      <div className="form">
        <h1>Authorization</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="username"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
          />
          <button type="submit">login</button>
          <div className="message">
            Not registered?{" "}
            <Link to={"/register"} href="#">
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
