// src/components/AddEditGatewayModal.jsx
import React, { useState, useEffect } from "react";

const AddEditGatewayModal = ({ gateway, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    revenue: "",
    transactions: "",
    status: "Active",
  });

  useEffect(() => {
    if (gateway) {
      setFormData({
        name: gateway.name,
        revenue: gateway.revenue,
        transactions: gateway.transactions,
        status: gateway.status,
      });
    }
  }, [gateway]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gateway) {
      onSave({ ...gateway, ...formData });
    } else {
      onSave({ id: Date.now(), ...formData });
    }
  };

  return (
    <div className="modal fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 className="text-2xl font-semibold mb-4">
          {gateway ? "Edit Gateway" : "Add Gateway"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Revenue</label>
            <input
              type="text"
              name="revenue"
              value={formData.revenue}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Transactions</label>
            <input
              type="number"
              name="transactions"
              value={formData.transactions}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white p-2 rounded-lg mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-500 text-white p-2 rounded-lg"
            >
              {gateway ? "Save Changes" : "Add Gateway"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditGatewayModal;
