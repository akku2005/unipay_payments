import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/Sidebar.scss"; // Import SCSS file
import Logo from "../../assets/logo-black.svg"; // Import SVG from assets folder

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <img src={Logo} alt="Platform Logo" className="sidebar-logo" />
      </div>
      <nav className="sidebar-nav justify-center ml-3">
        <ul>
          <li>
            <NavLink
              to="/dashboard"
              className="sidebar-item"
              activeClassName="active"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/transactions"
              className="sidebar-item"
              activeClassName="active"
            >
              Transactions
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/payment-methods"
              className="sidebar-item"
              activeClassName="active"
            >
              Payment Methods
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/reports"
              className="sidebar-item"
              activeClassName="active"
            >
              Reports
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/users"
              className="sidebar-item"
              activeClassName="active"
            >
              Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/page-not-found"
              className="sidebar-item"
              activeClassName="active"
            >
              PageNot Found
            </NavLink>
          </li>
        </ul>
        <div className="sidebar-footer">
          <NavLink
            to="/settings"
            className="sidebar-item footer-item"
            activeClassName="active"
          >
            Settings
          </NavLink>
          <NavLink
            to="/logout"
            className="sidebar-item footer-item"
            activeClassName="active"
          >
            Logout
          </NavLink>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
