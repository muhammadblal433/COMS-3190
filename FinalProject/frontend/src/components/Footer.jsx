import React from "react";
import { Link, useNavigate } from "react-router-dom";
import linkedinIcon from "../assets/images/myotherimages/LinkedinLogo.png";

const Footer = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isDevAuthenticated");

  const handleLogout = () => {
    localStorage.removeItem("isDevAuthenticated");
    navigate("/developer-login");
  };

  return (
    <footer className="bg-primary-subtle mt-auto">
      <div className="container text-center py-4">
        <h2 className="mb-3">Ready to Take a Step Towards a Healthier You?</h2>
        <h3 className="mb-3">
          <strong>Transform Your Life - A Better You Starts Today!</strong>
        </h3>

        <h5 className="mt-4">Have a Question? Contact us via e-Mail or LinkedIn.</h5>

        <div className="contact-info">
          <p className="mb-1">
            <strong>Muhammad Blal</strong> -
            <a href="mailto:mblal@iastate.edu"> mblal@iastate.edu</a>
            <a href="https://www.linkedin.com/in/muhammadblal/" target="_blank" rel="noreferrer">
              <img src={linkedinIcon} alt="LinkedIn" className="linkedin-logo ms-2" />
            </a>
          </p>
          <p>
            <strong>Brian Craciun</strong> -
            <a href="mailto:bcraciun@iastate.edu"> bcraciun@iastate.edu</a>
            <a href="https://www.linkedin.com/in/bcraciun/" target="_blank" rel="noreferrer">
              <img src={linkedinIcon} alt="LinkedIn" className="linkedin-logo ms-2" />
            </a>
          </p>

          {/* Login/Logout Toggle */}
          {isLoggedIn ? (
            <button onClick={handleLogout} className="btn btn-link text-danger small">
              Log Out
            </button>
          ) : (
            <Link to="/developer-login" className="btn btn-link text-muted small">
              Developer Login
            </Link>
          )}
        </div>
      </div>
      <hr className="m-0" />
      <div className="footer-bottom container-fluid text-center py-2">
        <p className="mb-0">
          <strong>© 2025 EasyCal. Project By Muhammad Blal & Brian Craciun.</strong>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
