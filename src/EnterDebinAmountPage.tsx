import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import BottomNavigationBar from "./components/BottomNavigationBar";
import InputField from "./components/InputField";
import AuthButton from "./components/AuthButton";
import DollarSignIcon from "./components/icons/DollarSignIcon";
import { useExternalTransfers } from "./hooks/transactions/useExternalTransfers";
import { IdentifierType } from "./types/api";

const EnterDebinAmountPage: React.FC = () => {
  const [amount, setAmount] = useState("");
  const { requestDebin, loading, error } = useExternalTransfers();
  const navigate = useNavigate();
  const location = useLocation();
  const { fromIdentifier, identifierType } = (location.state as {
    fromIdentifier: string;
    identifierType: IdentifierType;
  }) || { fromIdentifier: "", identifierType: IdentifierType.ALIAS };

  // In a real app, you might get recipient info from route state or context
  // const location = useLocation();
  // const { recipient } = location.state || { recipient: 'Unknown' };

  const handleConfirm = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }
    try {
      await requestDebin({
        amount: parseFloat(amount),
        fromIdentifier,
        identifierType,
      });
      navigate("/debin/request-sent", {
        state: { amount: parseFloat(amount), fromIdentifier, identifierType },
      });
    } catch (err) {
      console.error("DEBIN request error:", err);
      // Error displayed below
    }
  };

  return (
    <div className="min-h-screen bg-[#131A1A] flex flex-col pb-16">
      <div className="p-4 flex-grow">
        <h1 className="text-2xl font-bold text-white mb-6">
          Enter DEBIN Amount
        </h1>
        <InputField
          id="amount"
          label="Amount"
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          icon={<DollarSignIcon />}
          required
        />
        <AuthButton onClick={handleConfirm} fullWidth={true} disabled={loading}>
          Confirm
        </AuthButton>
        {!!error && (
          <p className="text-red-500 text-center mt-4">
            Unable to complete DEBIN. Balance not enough
          </p>
        )}
      </div>
      <BottomNavigationBar />
    </div>
  );
};

export default EnterDebinAmountPage;
