// src/pages/Dashboard/index.js

import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/index";
import Header from "../../components/Header/index";
import WidgetItem from "../../components/WidgetItem/index";
import { FaStripe, FaPaypal } from "react-icons/fa";
import { SiRazorpay } from "react-icons/si";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import "../../styles/Dashboard.scss";
import icons from "../../constants/icons";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const [selectedGateway, setSelectedGateway] = useState(null);

  const paymentGateways = {
    Stripe: {
      revenue: "₹25,00,000", // Amount in rupees
      transactions: 150,
      status: "Active",
    },
    Razorpay: {
      revenue: "₹18,00,000", // Amount in rupees
      transactions: 100,
      status: "Active",
    },
    PayPal: {
      revenue: "₹12,50,000", // Amount in rupees
      transactions: 80,
      status: "Pending",
    },
  };

  const paymentGatewayIcons = {
    Stripe: <FaStripe size={40} color="#6772e5" />,
    Razorpay: <SiRazorpay size={40} color="#5588ff" />,
    PayPal: <FaPaypal size={40} color="#003087" />,
  };

  const totalRevenue = Object.values(paymentGateways)
    .map((gateway) => parseInt(gateway.revenue.replace(/\D/g, "")))
    .reduce((acc, curr) => acc + curr, 0)
    .toLocaleString("en-IN", { style: "currency", currency: "INR" });

  const totalTransactions = Object.values(paymentGateways)
    .map((gateway) => gateway.transactions)
    .reduce((acc, curr) => acc + curr, 0);

  const revenueData = {
    labels: Object.keys(paymentGateways),
    datasets: [
      {
        label: "Revenue",
        data: Object.values(paymentGateways).map((gateway) =>
          parseInt(gateway.revenue.replace(/\D/g, ""))
        ),
        borderColor: "#4c51bf",
        backgroundColor: "rgba(76, 125, 255, 0.2)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const transactionsData = {
    labels: Object.keys(paymentGateways),
    datasets: [
      {
        label: "Transactions",
        data: Object.values(paymentGateways).map(
          (gateway) => gateway.transactions
        ),
        backgroundColor: ["#4c51bf", "#38b2ac", "#e53e3e"],
      },
    ],
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="main-content">
        <Header />
        <main className="content p-6 bg-gray-100 min-h-screen">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Payment Gateway Integration Dashboard
          </h2>

          {/* Overview Section */}
          <div className="overview-section bg-white shadow-md rounded-lg p-6 mb-6">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <WidgetItem
                title="Total Revenue"
                value={totalRevenue}
                bgColor="bg-indigo-100"
                textColor="text-indigo-600"
                image={icons.RevenuGain}
              />
              <WidgetItem
                title="Total Transactions"
                value={totalTransactions}
                bgColor="bg-green-100"
                textColor="text-green-600"
                image={icons.Transaction}
              />
              <WidgetItem
                title="Active Gateways"
                value={Object.keys(paymentGateways).length}
                bgColor="bg-yellow-100"
                textColor="text-yellow-600"
                image={icons.GetwayIcon}
              />
            </div>
          </div>

          {/* Payment Gateway Management */}
          <div className="gateway-management bg-white shadow-md rounded-lg p-6 mb-6">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Manage Payment Gateways
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.keys(paymentGateways).map((gateway) => (
                <div
                  key={gateway}
                  className={`p-4 rounded-lg cursor-pointer flex justify-between items-center ${
                    selectedGateway === gateway
                      ? "bg-indigo-200"
                      : "bg-gray-100"
                  }`}
                  onClick={() => setSelectedGateway(gateway)}
                >
                  <div>
                    <h4 className="text-xl font-bold text-gray-700">
                      {gateway}
                    </h4>
                    <p className="text-lg font-medium text-gray-600">
                      Revenue: {paymentGateways[gateway].revenue}
                    </p>
                    <p className="text-lg font-medium text-gray-600">
                      Transactions: {paymentGateways[gateway].transactions}
                    </p>
                    <p className="text-lg font-medium text-gray-600">
                      Status: {paymentGateways[gateway].status}
                    </p>
                  </div>
                  <div>{paymentGatewayIcons[gateway]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Gateway View */}
          {selectedGateway && (
            <div className="gateway-details bg-white shadow-md rounded-lg p-6 mb-6">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                {selectedGateway} Details
              </h3>
              <div className="flex items-center mb-4 justify-between">
                <div>
                  <p className="text-lg font-medium text-gray-600 mb-1">
                    Revenue: {paymentGateways[selectedGateway].revenue}
                  </p>
                  <p className="text-lg font-medium text-gray-600 mb-1">
                    Transactions:{" "}
                    {paymentGateways[selectedGateway].transactions}
                  </p>
                  <p className="text-lg font-medium text-gray-600">
                    Status: {paymentGateways[selectedGateway].status}
                  </p>
                </div>
                <div className="text-4xl mb-4">
                  {paymentGatewayIcons[selectedGateway]}
                </div>
              </div>
            </div>
          )}

          {/* Insights & Analytics Section */}
          <div className="insights-analytics bg-white shadow-md rounded-lg p-6 mb-6">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Global Insights & Analytics
            </h3>
            <p className="text-gray-600 mb-4">
              Aggregate data from all connected payment gateways. Visualize
              trends, compare performance, and monitor the overall health of
              your payment system.
            </p>

            {/* Charts */}
            <div className="charts grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="chart-container bg-white shadow-md rounded-lg p-6">
                <h4 className="text-xl font-semibold text-gray-700 mb-4">
                  Revenue Trend
                </h4>
                <Line data={revenueData} />
              </div>

              <div className="chart-container bg-white shadow-md rounded-lg p-6">
                <h4 className="text-xl font-semibold text-gray-700 mb-4">
                  Transactions by Gateway
                </h4>
                <Bar data={transactionsData} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
