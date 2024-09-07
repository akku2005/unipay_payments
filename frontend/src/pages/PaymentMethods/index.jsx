import React, { useState } from "react";
import Header from "../../components/Header/index";
import Sidebar from "../../components/Sidebar/index";
import { FaSearch, FaPlus, FaEdit, FaTrash, FaFilter } from "react-icons/fa";

const PaymentMethods = () => {
  // Sample data
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: "Credit Card", last4: "1234", status: "Active" },
    { id: 2, type: "Debit Card", last4: "5678", status: "Inactive" },
    { id: 3, type: "PayPal", last4: "-", status: "Active" },
    // Add more sample payment methods
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("type");
  const [showModal, setShowModal] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [methodToDelete, setMethodToDelete] = useState(null);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: "",
    last4: "",
    status: "Active",
  });

  // Default payment methods
  const defaultPaymentMethods = [
    "Credit Card",
    "Debit Card",
    "PayPal",
    "Bank Transfer",
  ];

  // Filter and search payment methods
  const filteredPaymentMethods = paymentMethods
    .filter((pm) => {
      const matchesSearch =
        pm.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pm.last4.includes(searchTerm);
      const matchesStatus =
        filterStatus === "All" || pm.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return -1;
      if (a[sortBy] > b[sortBy]) return 1;
      return 0;
    });

  const handleOpenModal = (method) => {
    setSelectedMethod(method);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMethod(null);
  };

  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setNewPaymentMethod({
      type: "",
      last4: "",
      status: "Active",
    });
  };

  const handleAddPaymentMethod = () => {
    if (newPaymentMethod.type && newPaymentMethod.last4) {
      setPaymentMethods([
        ...paymentMethods,
        {
          ...newPaymentMethod,
          id: paymentMethods.length + 1,
        },
      ]);
      handleCloseAddModal();
    }
  };

  const handleOpenDeleteConfirm = (method) => {
    setMethodToDelete(method);
    setShowDeleteConfirm(true);
  };

  const handleCloseDeleteConfirm = () => {
    setShowDeleteConfirm(false);
    setMethodToDelete(null);
  };

  const handleConfirmDelete = () => {
    setPaymentMethods(paymentMethods.filter((pm) => pm !== methodToDelete));
    handleCloseDeleteConfirm();
  };

  return (
    <div className="payment-methods flex">
      <Sidebar />
      <div className="main-content flex-1">
        <Header />
        <main className="content p-6 bg-gray-100 min-h-screen">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Payment Methods
          </h2>

          {/* Search, Filter, and Add Payment Method */}
          <div className="search-filter-add-section flex items-center justify-between mb-6">
            <div className="search-bar flex items-center border border-gray-300 rounded-lg p-2 bg-white w-1/3">
              <FaSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search payment methods..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="outline-none w-full"
              />
            </div>

            <div className="filter-section flex items-center ml-4">
              <FaFilter className="text-gray-500 mr-2" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 bg-white"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <button
              className="flex items-center bg-blue-500 text-white py-2 px-4 rounded-lg mt-2"
              onClick={handleOpenAddModal}
            >
              <FaPlus className="mr-2" /> Add New Payment Method
            </button>
          </div>

          {/* Payment Methods List */}
          <div className="payment-methods-list bg-white shadow-md rounded-lg p-6 mb-6">
            <table className="w-full bg-white border border-gray-200 rounded-lg">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th
                    className="py-2 px-4 text-left cursor-pointer"
                    onClick={() => setSortBy("type")}
                  >
                    Type
                  </th>
                  <th
                    className="py-2 px-4 text-left cursor-pointer"
                    onClick={() => setSortBy("last4")}
                  >
                    Last 4 Digits
                  </th>
                  <th
                    className="py-2 px-4 text-left cursor-pointer"
                    onClick={() => setSortBy("status")}
                  >
                    Status
                  </th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPaymentMethods.map((pm) => (
                  <tr key={pm.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{pm.type}</td>
                    <td className="py-2 px-4">{pm.last4}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-white ${
                          pm.status === "Active" ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {pm.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 flex items-center">
                      <button
                        className="text-blue-500 hover:text-blue-700 mr-2"
                        onClick={() => handleOpenModal(pm)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleOpenDeleteConfirm(pm)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Security Warning */}
          <div className="security-warning bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-lg">
            <p className="text-lg font-medium">
              For your security, ensure that you update your payment methods
              regularly and review them for any unauthorized transactions.
            </p>
          </div>

          {/* Modal for Detailed View */}
          {showModal && selectedMethod && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h3 className="text-2xl font-semibold mb-4">
                  Payment Method Details
                </h3>
                <p>
                  <strong>Type:</strong> {selectedMethod.type}
                </p>
                <p>
                  <strong>Last 4 Digits:</strong> {selectedMethod.last4}
                </p>
                <p>
                  <strong>Status:</strong> {selectedMethod.status}
                </p>
                <button
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Modal for Adding Payment Method */}
          {showAddModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h3 className="text-2xl font-semibold mb-4">
                  Add New Payment Method
                </h3>
                <div className="mb-4">
                  <label className="block text-gray-700">Type</label>
                  <select
                    value={newPaymentMethod.type}
                    onChange={(e) =>
                      setNewPaymentMethod({
                        ...newPaymentMethod,
                        type: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded-lg p-2 w-full"
                  >
                    <option value="">Select a type</option>
                    {defaultPaymentMethods.map((method) => (
                      <option key={method} value={method}>
                        {method}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Last 4 Digits</label>
                  <input
                    type="text"
                    value={newPaymentMethod.last4}
                    onChange={(e) =>
                      setNewPaymentMethod({
                        ...newPaymentMethod,
                        last4: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded-lg p-2 w-full"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700">Status</label>
                  <select
                    value={newPaymentMethod.status}
                    onChange={(e) =>
                      setNewPaymentMethod({
                        ...newPaymentMethod,
                        status: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded-lg p-2 w-full"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="flex justify-end">
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2"
                    onClick={handleAddPaymentMethod}
                  >
                    Add
                  </button>
                  <button
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                    onClick={handleCloseAddModal}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Confirmation Popup for Deletion */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h3 className="text-2xl font-semibold mb-4">
                  Confirm Deletion
                </h3>
                <p>Are you sure you want to delete this payment method?</p>
                <div className="flex justify-end mt-4">
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded-lg mr-2"
                    onClick={handleConfirmDelete}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                    onClick={handleCloseDeleteConfirm}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default PaymentMethods;
