// src/components/GatewayCard.jsx
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const GatewayCard = ({ gateway, onEdit, onDelete }) => {
  return (
    <div className="gateway-card bg-white shadow-md rounded-lg p-4 flex flex-col">
      <h4 className="text-xl font-bold text-gray-800">{gateway.name}</h4>
      <p className="text-gray-600">Revenue: {gateway.revenue}</p>
      <p className="text-gray-600">Transactions: {gateway.transactions}</p>
      <p className="text-gray-600">Status: {gateway.status}</p>
      <div className="mt-auto flex justify-between">
        <button
          onClick={onEdit}
          className="text-indigo-500 hover:text-indigo-700"
        >
          <FaEdit />
        </button>
        <button onClick={onDelete} className="text-red-500 hover:text-red-700">
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default GatewayCard;
