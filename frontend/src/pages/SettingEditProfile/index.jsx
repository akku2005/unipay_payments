import React from "react";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/index";
import Header from "../../components/Header/index";
import "../../styles/Dashboard.scss"; // Import SCSS file

const SettingEditProfile = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="content">
          <div className="bg-white shadow-lg rounded-lg flex">
            <nav className="w-64 bg-gray-200 p-4 border-r border-gray-300">
              <ul className="space-y-4">
                <li>
                  <Link
                    to="edit-profile"
                    className="block text-lg font-medium text-gray-700 hover:bg-gray-300 p-2 rounded-lg"
                  >
                    Edit Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="preferences"
                    className="block text-lg font-medium text-gray-700 hover:bg-gray-300 p-2 rounded-lg"
                  >
                    Preferences
                  </Link>
                </li>
                <li>
                  <Link
                    to="security"
                    className="block text-lg font-medium text-gray-700 hover:bg-gray-300 p-2 rounded-lg"
                  >
                    Security
                  </Link>
                </li>
              </ul>
            </nav>
            <div className="flex-1 p-6 h-auto">
              <Outlet /> {/* This will render the nested routes */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingEditProfile;
