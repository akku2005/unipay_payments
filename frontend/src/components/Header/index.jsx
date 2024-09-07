// src/components/Header.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Header.scss";
import icons from "../../constants/icons";

// Example static suggestions (you can replace this with API call or dynamic data)
const suggestions = [
  "Payment Gateways",
  "Dashboard",
  "Settings",
  "Reports",
  "Users",
];

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSettingsClick = () => {
    navigate("/settings");
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      // Filter suggestions based on the query
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    // Implement navigation or action based on the suggestion
    // For example, navigate to the corresponding page
    navigate(`/${suggestion.toLowerCase().replace(" ", "-")}`);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="search-box relative">
          <img src={icons.SearchIcons} alt="Search" className="search-icon" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            className="search-input"
          />
          {showSuggestions && (
            <div className="suggestions-box absolute top-full left-0 w-full bg-white shadow-lg rounded-lg mt-2">
              {filteredSuggestions.length ? (
                filteredSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="suggestion-item p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </div>
                ))
              ) : (
                <div className="suggestion-item p-2">No suggestions</div>
              )}
            </div>
          )}
        </div>
        <div className="header-icons">
          <button
            onClick={handleSettingsClick}
            className="bg-gray-200 p-2 rounded-full hover:bg-gray-300"
          >
            <img src={icons.SettingsIcon} className="w-6 h-6" alt="Settings" />
          </button>
          <div className="bg-gray-200 p-2 rounded-full hover:bg-gray-300">
            <img
              src={icons.BellIcon}
              alt="Notifications"
              className="icon bell-icon"
            />
          </div>
          <img
            src={icons.Avatar}
            alt="User Avatar"
            className="icon avatar-icon w-9 h-9"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
