import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import icons from "../../constants/icons";
import images from "../../constants/images";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../contexts/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handlePasswordToggle = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("http://localhost:8080/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        // console.log("Login Response Data:", data); // This will show the structure in the console

        if (response.ok && data.accessToken) {
          // Correctly access the token
          login(data.accessToken); // Use the login function from AuthContext
          navigate("/dashboard");
          resolve();
        } else {
          reject(data.message || "Invalid email or password!");
        }
      } catch (error) {
        reject("Something went wrong, please try again!");
      }
    });

    toast.promise(loginPromise, {
      pending: "Logging in...",
      success: "Login successful!",
      error: "Error logging in. Please try again.",
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="flex bg-white rounded-lg shadow-lg overflow-hidden w-[1000px]">
          {/* Left Side - Image */}
          <div className="hidden md:flex md:w-1/2 w-full bg-white items-center justify-center">
            <div className="h-full py-2 px-2">
              <img
                src={images.MainLogo}
                alt="Login Illustration"
                className="object-cover w-full h-full rounded-2xl"
              />
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="w-full md:w-1/2 p-8 bg-gradient-to-r from-white to-blue-100">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
              Hello Again!
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Welcome back, you've been missed!
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4 relative">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Password"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={handlePasswordToggle}
                >
                  {isPasswordVisible ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="w-full p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Sign In
              </button>
            </form>
            <div className="text-center mt-4">
              <Link to="/signup" className="text-blue-600 hover:underline">
                Not a member? Register now
              </Link>
            </div>
            <div className="text-center mt-4">
              <Link
                to="/reset-password"
                className="text-gray-500 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="text-center mt-6">
              <p className="text-gray-600">Or continue with</p>
              <div className="flex justify-center mt-4 space-x-4">
                <button className="bg-white p-2 rounded-full shadow hover:shadow-lg">
                  <img
                    src={icons.GoogleIcon}
                    alt="Google"
                    className="w-6 h-6"
                  />
                </button>
                <button className="bg-white p-2 rounded-full shadow hover:shadow-lg">
                  <img src={icons.Apple} alt="Apple" className="w-6 h-6" />
                </button>
                <button className="bg-white p-2 rounded-full shadow hover:shadow-lg">
                  <img
                    src={icons.Facebook}
                    alt="Facebook"
                    className="w-6 h-6"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
