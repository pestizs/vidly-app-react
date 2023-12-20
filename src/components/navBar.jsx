import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = ({ user }) => {
  return (
    <nav className="nav">
      <ul className="nav">
        {!user && (
          <React.Fragment>
            <li className="nav-item">
              <NavLink className="nav-item nav-link" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-item nav-link" to="/register">
                Register
              </NavLink>
            </li>
          </React.Fragment>
        )}
        {user && (
          <React.Fragment>
            <li className="nav-item">
              <Link className="nav-item nav-link" to="/">
                Vidly
              </Link>
            </li>
            <li className="nav-item">
              <NavLink className="nav-item nav-link" to="/movies">
                Movies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-item nav-link" to="/customers">
                Customers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-item nav-link" to="/rentals">
                Rentals
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-item nav-link" to="/profile">
                {user.name}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-item nav-link" to="/logout">
                Logout
              </NavLink>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
