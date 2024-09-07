import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import ResetPasswordPage from "./pages/Auth/ResetPasswordPage";
import SetNewPasswordPage from "./pages/Auth/SetNewPasswordPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import SettingEditProfile from "./pages/SettingEditProfile";
import EditProfile from "./pages/Settings/EditProfile";
import Preferences from "./pages/Settings/Preferences";
import Security from "./pages/Settings/Security";
import Transactions from "./pages/Transactions";
import PaymentMethods from "./pages/PaymentMethods";
import Reports from "./pages/Reports";
import Users from "./pages/Users";
import PaymentGateways from "./pages/PaymentGateways/index";
import Logout from "./pages/Logout";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route
            path="/reset-password/:token"
            element={<SetNewPasswordPage />}
          />

          <Route path="/payment-gateways" element={<PaymentGateways />} />
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
          <Route
            path="/transactions"
            element={<ProtectedRoute element={<Transactions />} />}
          />
          <Route
            path="/payment-methods"
            element={<ProtectedRoute element={<PaymentMethods />} />}
          />
          <Route
            path="/reports"
            element={<ProtectedRoute element={<Reports />} />}
          />
          <Route
            path="/users"
            element={<ProtectedRoute element={<Users />} />}
          />
          <Route
            path="*"
            element={<ProtectedRoute element={<PageNotFound />} />}
          />
          <Route
            path="/settings"
            element={<ProtectedRoute element={<SettingEditProfile />} />}
          >
            <Route index element={<EditProfile />} />
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="preferences" element={<Preferences />} />
            <Route path="security" element={<Security />} />
          </Route>
          <Route
            path="/logout"
            element={<ProtectedRoute element={<Logout />} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
