import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.scss";
import { checkIsAuth, logout } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

export const Navbar = () => {
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();

  const activeStyles = {
    color: "white",
  };

  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    toast("You succesfully logged out")
  };

  return (
    <div className="container">
      <div className="navbar">
        <div className="navbar__logo">
          <a href="/">Simon Dev</a>
        </div>

        {isAuth && (
          <ul className="navbar__menu menu">
            <li>
              <NavLink
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
                to={"/"}
                href="/"
                className="menu__link"
              >
                Main
              </NavLink>
            </li>
            <li>
              <NavLink
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
                to={"/posts"}
                href="/"
                className="menu__link"
              >
                Posts
              </NavLink>
            </li>
            <li>
              <NavLink
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
                to={"/new"}
                href="/"
                className="menu__link"
              >
                Add Post
              </NavLink>
            </li>
          </ul>
        )}

        <div className="navbar__login login">
          {isAuth ? (
            <button onClick={handleLogout} className="login__btn">Log out</button>
          ) : (
            <Link className="login__btn" to={"/login"}>
              Log In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
