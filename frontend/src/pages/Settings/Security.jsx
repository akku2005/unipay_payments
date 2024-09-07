import React from "react";

const Security = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Security</h2>

      {/* Change Password Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          Change Password
        </h3>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="current-password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Current Password
            </label>
            <input
              id="current-password"
              type="password"
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your current password"
            />
          </div>
          <div>
            <label
              htmlFor="new-password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              New Password
            </label>
            <input
              id="new-password"
              type="password"
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter a new password"
            />
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirm New Password
            </label>
            <input
              id="confirm-password"
              type="password"
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Confirm your new password"
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
          >
            Change Password
          </button>
        </form>
      </div>

      {/* Two-Factor Authentication Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          Two-Factor Authentication
        </h3>
        <p className="text-gray-600 mb-4">
          Enhance the security of your account by enabling two-factor
          authentication (2FA). When 2FA is enabled, you will be required to
          enter a verification code in addition to your password.
        </p>
        <button
          type="button"
          className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700"
        >
          Enable Two-Factor Authentication
        </button>
      </div>

      {/* Recent Security Activities Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          Recent Security Activities
        </h3>
        <ul className="space-y-2">
          <li className="flex justify-between p-4 border-b border-gray-200">
            <span className="text-gray-600">Login from new device</span>
            <span className="text-gray-500 text-sm">2 hours ago</span>
          </li>
          <li className="flex justify-between p-4 border-b border-gray-200">
            <span className="text-gray-600">Password changed</span>
            <span className="text-gray-500 text-sm">1 day ago</span>
          </li>
          <li className="flex justify-between p-4 border-b border-gray-200">
            <span className="text-gray-600">
              Two-factor authentication enabled
            </span>
            <span className="text-gray-500 text-sm">3 days ago</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Security;
