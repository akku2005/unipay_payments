import React, { useState } from "react";
import GatewayCard from "../../components/GatewayCard";
import AddEditGatewayModal from "../../components/AddEditGatewayModal";
import "../../styles/PaymentGateways.scss";

const initialGateways = [
  {
    id: 1,
    name: "Stripe",
    revenue: "₹25,00,000",
    transactions: 150,
    status: "Active",
  },
  {
    id: 2,
    name: "Razorpay",
    revenue: "₹18,00,000",
    transactions: 100,
    status: "Active",
  },
  {
    id: 3,
    name: "PayPal",
    revenue: "₹12,50,000",
    transactions: 80,
    status: "Pending",
  },
];

const PaymentGateways = () => {
  const [gateways, setGateways] = useState(initialGateways);
  const [selectedGateway, setSelectedGateway] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleAddGateway = (newGateway) => {
    setGateways([...gateways, newGateway]);
    setShowModal(false);
  };

  const handleEditGateway = (updatedGateway) => {
    setGateways(
      gateways.map((gw) => (gw.id === updatedGateway.id ? updatedGateway : gw))
    );
    setShowModal(false);
  };

  const handleDeleteGateway = (id) => {
    setGateways(gateways.filter((gw) => gw.id !== id));
  };

  return (
    <div className="payment-gateways">
      <header className="header">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Payment Gateways
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-500 text-white p-2 rounded-lg"
        >
          Add Gateway
        </button>
      </header>

      <div className="gateway-list grid grid-cols-1 md:grid-cols-3 gap-6">
        {gateways.map((gateway) => (
          <GatewayCard
            key={gateway.id}
            gateway={gateway}
            onEdit={() => {
              setSelectedGateway(gateway);
              setShowModal(true);
            }}
            onDelete={() => handleDeleteGateway(gateway.id)}
          />
        ))}
      </div>

      {showModal && (
        <AddEditGatewayModal
          gateway={selectedGateway}
          onClose={() => setShowModal(false)}
          onSave={selectedGateway ? handleEditGateway : handleAddGateway}
        />
      )}
    </div>
  );
};

export default PaymentGateways;
