import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BottomNavigationBar from "../../components/BottomNavigationBar";
import AuthButton from "../../components/AuthButton";
import CheckCircleIcon from "../../components/icons/CheckCircleIcon";

const TopUpRequestSentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount } = (location.state as { amount: number }) || { amount: 0 };

  const handleDone = () => {
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-[#131A1A] flex flex-col justify-center items-center pb-16 px-4">
      <div className="text-center w-full max-w-sm">
        <CheckCircleIcon className="w-20 h-20 text-teal-400 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-white mb-4">
          Top-Up Request Sent
        </h1>
        <div className="bg-gray-800 p-6 rounded-lg shadow mb-8">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Amount:</span>
            <span className="text-teal-400 font-medium">
              ${amount.toFixed(2)}
            </span>
          </div>
        </div>
        <AuthButton onClick={handleDone} fullWidth>
          Done
        </AuthButton>
      </div>
      <div className="absolute bottom-0 left-0 right-0 w-full">
        <BottomNavigationBar />
      </div>
    </div>
  );
};

export default TopUpRequestSentPage;
