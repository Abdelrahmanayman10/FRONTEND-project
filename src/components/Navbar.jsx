import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom sticky-top">
      <div className="container">
      
        <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
          <span className="logo-icon">🍜</span>
          <span className="fw-semibold fs-4">Bistro Bliss</span>
        </NavLink>

      
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

  
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-2">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `nav-link rounded-pill px-3 py-2 nav-pill ${isActive ? "active" : ""}`
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `nav-link rounded-pill px-3 py-2 nav-pill ${isActive ? "active" : ""}`
                }
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/menu"
                className={({ isActive }) =>
                  `nav-link rounded-pill px-3 py-2 nav-pill ${isActive ? "active" : ""}`
                }
              >
                Menu
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/pages"
                className={({ isActive }) =>
                  `nav-link rounded-pill px-3 py-2 nav-pill ${isActive ? "active" : ""}`
                }
              >
                Pages
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `nav-link rounded-pill px-3 py-2 nav-pill ${isActive ? "active" : ""}`
                }
              >
                Contact
              </NavLink>
            </li>
          </ul>


          <NavLink className="btn btn-dark rounded-pill px-4 py-2  btnbtn" to="/book-table">
            Book A Table
          </NavLink>

    <NavLink
            to="/Login"
            className={({ isActive }) =>
              `nav-link rounded-pill px-3 py-2 nav-pill ${isActive ? "active" : ""}`
            }
          >
            Login
          </NavLink>
            
          <NavLink
            to="/Register"
            className={({ isActive }) =>
              `nav-link rounded-pill px-3 py-2 nav-pill ${isActive ? "active" : ""}`
            }
          >
            Register
          </NavLink>
      

        </div>
      </div>
    </nav>
  );
}