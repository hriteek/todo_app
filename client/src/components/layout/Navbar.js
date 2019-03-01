import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import "../../Main.css";

const Navbar = props => {
  const { isAuthenticated } = props.auth;

  const onClickHandler = e => {
    e.preventDefault();
    props.logoutUser();
  };
  const authLinks = (
    <div className="collapse navbar-collapse" id="navbarCollapse">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <span className="nav-link">
            <button className="btn btn-dark" onClick={onClickHandler}>
              logout
            </button>
          </span>
        </li>
      </ul>
    </div>
  );
  const guestLink = (
    <div className="collapse navbar-collapse" id="navbarCollapse">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <NavLink to="/signup" className="nav-link">
            Sign Up
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
        </li>
      </ul>
    </div>
  );
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <NavLink to="/" className="navbar-brand">
        Todo
      </NavLink>
      <button
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarCollapse"
      >
        <span className="navbar-toggler-icon" />
      </button>
      {isAuthenticated ? authLinks : guestLink}
    </nav>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
