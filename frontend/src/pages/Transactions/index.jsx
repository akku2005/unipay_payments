import React, { useState, useEffect } from "react";
import Header from "../../components/Header/index";
import Sidebar from "../../components/Sidebar/index";
import { FaSearch, FaFilter, FaDownload } from "react-icons/fa";
import { CSVLink } from "react-csv";
import axios from "axios";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [sortColumn, setSortColumn] = useState("created_at");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    // Fetch data from the API
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/razorpay/fetch-orders"
        );
        // Check if the data structure is correct
        if (response.data && response.data.items) {
          setTransactions(response.data.items);
        } else {
          console.error("Unexpected data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  // Handle search and filtering
  const filteredTransactions = transactions
    .filter((tx) => tx.status.includes(filterStatus))
    .filter(
      (tx) =>
        tx.id.includes(searchTerm) ||
        tx.amount.toString().includes(searchTerm) ||
        tx.receipt.includes(searchTerm)
    )
    .sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const totalAmount = filteredTransactions
    .map((tx) => tx.amount)
    .reduce((acc, curr) => acc + curr, 0)
    .toLocaleString("en-IN", { style: "currency", currency: "INR" });

  return (
    <div className="transactions flex">
      <Sidebar />
      <div className="main-content flex-1">
        <Header />
        <main className="content p-6 bg-gray-100 min-h-screen">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Transactions
          </h2>

          {/* Overview Section */}
          <div className="overview-section bg-white shadow-md rounded-lg p-6 mb-6">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Overview
            </h3>
            <p className="text-lg font-medium text-gray-600">
              Total Amount: {totalAmount}
            </p>
            <p className="text-lg font-medium text-gray-600">
              Total Transactions: {filteredTransactions.length}
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="search-filter mb-6 flex items-center justify-between">
            <div className="search-bar flex items-center border border-gray-300 rounded-lg p-2 bg-white">
              <FaSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="outline-none w-full"
              />
            </div>
            <div className="filter ml-4 flex items-center">
              <FaFilter className="text-gray-500 mr-2" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 bg-white"
              >
                <option value="">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="created">Created</option>
                <option value="failed">Failed</option>
              </select>
            </div>
            <CSVLink
              data={filteredTransactions}
              headers={[
                { label: "Order ID", key: "id" },
                { label: "Amount", key: "amount" },
                { label: "Attempts", key: "attempts" },
                { label: "Receipt", key: "receipt" },
                { label: "Created At", key: "created_at" },
                { label: "Status", key: "status" },
              ]}
              filename={"transactions.csv"}
              className="flex items-center ml-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
            >
              <FaDownload className="mr-2" /> Export CSV
            </CSVLink>
          </div>

          {/* Transactions List */}
          <div className="transactions-list bg-white shadow-md rounded-lg p-6 mb-6">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Transaction Details
            </h3>
            <table className="w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th
                    className="py-2 px-4 text-left cursor-pointer"
                    onClick={() => setSortColumn("created_at")}
                  >
                    Created At{" "}
                    {sortColumn === "created_at" &&
                      (sortOrder === "asc" ? "🔼" : "🔽")}
                  </th>
                  <th
                    className="py-2 px-4 text-left cursor-pointer"
                    onClick={() => setSortColumn("amount")}
                  >
                    Amount{" "}
                    {sortColumn === "amount" &&
                      (sortOrder === "asc" ? "🔼" : "🔽")}
                  </th>
                  <th
                    className="py-2 px-4 text-left cursor-pointer"
                    onClick={() => setSortColumn("status")}
                  >
                    Status{" "}
                    {sortColumn === "status" &&
                      (sortOrder === "asc" ? "🔼" : "🔽")}
                  </th>
                  <th
                    className="py-2 px-4 text-left cursor-pointer"
                    onClick={() => setSortColumn("receipt")}
                  >
                    Receipt{" "}
                    {sortColumn === "receipt" &&
                      (sortOrder === "asc" ? "🔼" : "🔽")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">
                      {new Date(tx.created_at * 1000).toLocaleString()}
                    </td>
                    <td className="py-2 px-4">{tx.amount / 100}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-white ${
                          tx.status === "completed"
                            ? "bg-green-500"
                            : tx.status === "created"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-2 px-4">{tx.receipt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Transactions;
