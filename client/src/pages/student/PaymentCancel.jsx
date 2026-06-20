import React from "react";
import { Link } from "react-router-dom";

const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-6">
      <div className="bg-white shadow-xl rounded-2xl p-10 text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-red-600 mb-4">
          ❌ Payment Cancelled
        </h1>

        <p className="text-gray-700 mb-6">
          Your payment was cancelled. You can try again anytime.
        </p>

        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancel;
