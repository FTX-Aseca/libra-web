import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BottomNavigationBar from "../../components/BottomNavigationBar";
import AuthButton from "../../components/AuthButton";
import CheckCircleIcon from "../../components/icons/CheckCircleIcon"; // Assuming this exists

const TransferSentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Safely access state with defaults
  const { amount, recipientAlias } = (location.state as {
    amount: number;
    recipientAlias: string;
  }) || {
    amount: 0,
    recipientAlias: "N/A",
  };

  const handleDone = () => {
    navigate("/home"); // Or navigate to transactions page
  };

  return (
    <div className="min-h-screen bg-[#131A1A] flex flex-col justify-center items-center pb-16 px-4">
      <div className="text-center w-full max-w-sm">
        <CheckCircleIcon className="w-20 h-20 text-teal-400 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-white mb-4">
          Transfer Sent Successfully!
        </h1>

        <div className="bg-gray-800 p-6 rounded-lg shadow mb-8">
          <div className="flex justify-between text-sm mb-3">
            <span className="text-gray-400">Sent to:</span>
            <span className="text-white font-medium">{recipientAlias}</span>
          </div>
          <div className="flex justify-between text-lg">
            <span className="text-gray-400">Amount:</span>
            <span className="text-teal-400 font-semibold">
              ${amount.toFixed(2)}
            </span>
          </div>
        </div>

        <AuthButton onClick={handleDone} fullWidth={true}>
          Done
        </AuthButton>
      </div>
      <div className="absolute bottom-0 left-0 right-0 w-full">
        <BottomNavigationBar />
      </div>
    </div>
  );
};

export default TransferSentPage;
