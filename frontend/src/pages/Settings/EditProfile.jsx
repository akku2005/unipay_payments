// src/components/Dashboard.jsx
import React from "react";
import Sidebar from "../../components/Sidebar/index";
import "../../styles/Dashboard.scss"; // Import SCSS file

const EditProfile = () => {
  return (
    <div className="dashboard">
      <Sidebar />
      <div className="flex-1 flex flex-col p-6 ">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">
            Edit Profile
          </h1>
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Profile Picture Section */}
            <div className="flex-none w-40 h-40">
              <img
                src="https://via.placeholder.com/160"
                alt="Profile"
                className="w-full h-full object-cover rounded-full border-2 border-gray-300"
              />
              <div className="mt-4">
                <button className="text-blue-500 hover:underline text-center ml-7">
                  Change Photo
                </button>
              </div>
            </div>

            {/* Form Section */}
            <div className="flex-1">
              <form className="space-y-6">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-2"
                    htmlFor="phone"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
