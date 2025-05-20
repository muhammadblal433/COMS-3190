import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/myotherimages/EasyCal_Logo.png";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? "text-primary" : "text-dark";

  return (
    <header className="site-header sticky-top shadow-sm">
      <nav className="navbar navbar-expand-lg px-lg-5 bg-white">
        <div className="container-fluid py-3">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="Logo" style={{ width: "180px", height: "auto" }} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarToggler"
            aria-controls="navbarToggler"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarToggler">
            <ul className="navbar-nav gap-4 text-end mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className={`nav-link text-uppercase fw-medium ${isActive("/")}`}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/food-search" className={`nav-link text-uppercase fw-medium ${isActive("/food-search")}`}>
                  Food Search
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/popular-recipes" className={`nav-link text-uppercase fw-medium ${isActive("/popular-recipes")}`}>
                  Popular Recipes
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/popular-restaurants" className={`nav-link text-uppercase fw-medium ${isActive("/popular-restaurants")}`}>
                  Popular Restaurants
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/authors" className={`nav-link text-uppercase fw-medium ${isActive("/authors")}`}>
                  Authors
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/recipe-ai" className={`nav-link text-uppercase fw-medium ${isActive("/recipe-ai")}`}>
                  Recipe AI
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
