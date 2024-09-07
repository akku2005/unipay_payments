import React from "react";
import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <div>
      PageNotFound
      <div className="text-center justify-center items-center">
        <Link to="/dashboard">
          <h1>Go To home page directly</h1>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
