import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navigation = () => {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          NotesApp
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" exact activeClassName="active">
                Notes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/crateNote" activeClassName="active">
                Create Note
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/createUser" activeClassName="active">
                Create User
              </NavLink>
            </li>
          </ul>
          {/* <form className="form-inline my-2 my-lg-0">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form> */}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
