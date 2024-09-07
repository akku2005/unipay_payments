import React, { useState } from "react";
import { Link } from "react-router-dom";
import icons from "../../constants/icons";
import images from "../../constants/images";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible1, setIsPasswordVisible1] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);

  const handlePasswordToggle1 = () => {
    setIsPasswordVisible1(!isPasswordVisible1);
  };

  const handlePasswordToggle2 = () => {
    setIsPasswordVisible2(!isPasswordVisible2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Please verify your email address !"),
          {
            position: toast.POSITION.TOP_RIGHT,
          };
      } else {
        toast.error("User already register !"),
          {
            position: toast.POSITION.TOP_LEFT,
          };
      }
    } catch (error) {
      toast.warning("Warning Notification !", {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };
  const notifyMe = () =>
    toast.success("Success Notification !", {
      position: toast.POSITION.TOP_RIGHT,
    });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-lg overflow-hidden w-[900px]">
        {/* Left Side - Image */}
        <div className="md:w-1/2 w-full hidden md:flex items-center justify-center bg-white ">
          <div className="p-16">
            <img
              src={images.MainLogo2}
              alt="Signup Illustration"
              className="object-contain max-w-full max-h-[600px] rounded-xl"
            />
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="w-full md:w-1/2 p-8 bg-gradient-to-r from-white to-blue-100">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
            Create Your Account
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Join us and start your journey!
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
            <div className="mb-6 relative">
              <input
                type={isPasswordVisible1 ? "text" : "password"}
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={handlePasswordToggle1}
              >
                {isPasswordVisible1 ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>
            <div className="mb-6 relative">
              <input
                type={isPasswordVisible2 ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={handlePasswordToggle2}
              >
                {isPasswordVisible2 ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </div>
            </div>
            <button
              onClick={notifyMe}
              className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Sign Up
              <ToastContainer />
            </button>
          </form>

          <div className="text-center mt-6">
            <Link to="/" className="text-blue-600 hover:underline">
              Already have an account? Log in
            </Link>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600">Or sign up with</p>
            <div className="flex justify-center mt-4 space-x-3">
              <button className="bg-white p-3 rounded-full shadow hover:shadow-md transition">
                <img src={icons.GoogleIcon} alt="Google" className="w-6 h-6" />
              </button>
              <button className="bg-white p-3 rounded-full shadow hover:shadow-md transition">
                <img src={icons.Apple} alt="Apple" className="w-6 h-6" />
              </button>
              <button className="bg-white p-3 rounded-full shadow hover:shadow-md transition">
                <img src={icons.Facebook} alt="Facebook" className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
