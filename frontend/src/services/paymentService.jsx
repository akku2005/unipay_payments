// src/services/paymentService.js
const API_BASE_URL = "http://localhost:8080/api"; // Replace with your API base URL

export const fetchTransactions = async () => {
  const response = await fetch(`${API_BASE_URL}/transactions`);
  if (!response.ok) throw new Error("Failed to fetch transactions");
  return response.json();
};

export const processPayment = async ({ amount, method, details }) => {
  const response = await fetch(`${API_BASE_URL}/payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount, method, details }),
  });
  if (!response.ok) throw new Error("Payment failed");
  return response.json();
};
