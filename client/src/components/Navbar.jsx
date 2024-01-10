import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset as userReset } from "../features/auth/authSlice";
import { reset as resetTests } from "../features/tests/testsSlice";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const logoutUser = () => {
    dispatch(logout());
    dispatch(userReset());
    dispatch(resetTests());
    navigate("/login");
  };
  return (
    <nav className="navbar bg-body-tertiary navbar-color">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">TestBoard</span>
        <ul className="nav justify-content-end">
          {!user ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={logoutUser}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
