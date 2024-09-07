import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import images from "../../constants/images";

const SetNewPasswordPage = () => {
  const { token } = useParams(); // Get the token from the URL
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/reset-password/${token}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: newPassword }),
        }
      );

      if (response.ok) {
        toast.success("Password reset successfully.");
        navigate("/"); // Redirect to login page after success
      } else {
        toast.error(
          "There was an error resetting your password. Please try again."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden w-[900px]">
        {/* Left Side - Image */}
        <div className="md:w-1/2 w-full hidden md:flex items-center justify-center bg-white">
          <div className="p-8">
            <img
              src={images.ResetPasswordImage}
              alt="Reset Password Illustration"
              className="object-cover w-full h-[600px] rounded-xl"
            />
          </div>
        </div>

        {/* Right Side - Set New Password Form */}
        <div className="w-full md:w-1/2 p-8 bg-gradient-to-r from-white to-blue-100">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
            Set Your New Password
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Enter your new password below.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6 relative">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition pr-10"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </div>

            <div className="mb-6 relative">
              <input
                type={showConfirmNewPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition pr-10"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() =>
                  setShowConfirmNewPassword(!showConfirmNewPassword)
                }
              >
                {showConfirmNewPassword ? (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </form>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default SetNewPasswordPage;
