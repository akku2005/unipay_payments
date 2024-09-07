import React from "react";

const Preferences = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Preferences</h2>

      {/* Notification Preferences */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          Notification Preferences
        </h3>
        <form>
          <div className="flex items-center mb-4">
            <input
              id="email-notifications"
              type="checkbox"
              className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="email-notifications" className="ml-3 text-gray-600">
              Receive email notifications
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="sms-notifications"
              type="checkbox"
              className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="sms-notifications" className="ml-3 text-gray-600">
              Receive SMS notifications
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="push-notifications"
              type="checkbox"
              className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="push-notifications" className="ml-3 text-gray-600">
              Enable push notifications
            </label>
          </div>
        </form>
      </div>

      {/* Theme Settings */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          Theme Settings
        </h3>
        <form>
          <div className="flex items-center mb-4">
            <input
              id="light-theme"
              type="radio"
              name="theme"
              value="light"
              className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="light-theme" className="ml-3 text-gray-600">
              Light Theme
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="dark-theme"
              type="radio"
              name="theme"
              value="dark"
              className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="dark-theme" className="ml-3 text-gray-600">
              Dark Theme
            </label>
          </div>
        </form>
      </div>

      {/* Privacy Settings */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          Privacy Settings
        </h3>
        <form>
          <div className="flex items-center mb-4">
            <input
              id="share-data"
              type="checkbox"
              className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="share-data" className="ml-3 text-gray-600">
              Share data with third parties
            </label>
          </div>
          <div className="flex items-center mb-4">
            <input
              id="enable-tracking"
              type="checkbox"
              className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="enable-tracking" className="ml-3 text-gray-600">
              Enable tracking for analytics
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Preferences;
