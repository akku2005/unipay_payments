import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import images from "../../constants/images";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        toast.success("A password reset link has been sent to your email.");
      } else {
        toast.error(
          "There was an error sending the reset email. Please try again."
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

        {/* Right Side - Reset Password Form */}
        <div className="w-full md:w-1/2 p-8 bg-gradient-to-r from-white to-blue-100">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
            Reset Your Password
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Enter your email to receive a password reset link.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? "Sending Email..." : "Send Reset Link"}
            </button>
          </form>

          <div className="text-center mt-6">
            <Link to="/" className="text-blue-600 hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
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

export default ResetPasswordPage;
