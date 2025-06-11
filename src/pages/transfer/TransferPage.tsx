import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavigationBar from "../../components/BottomNavigationBar";
import InputField from "../../components/InputField";
import AuthButton from "../../components/AuthButton";
import UserCircleIcon from "../../components/icons/UserCircleIcon"; // Placeholder icon

const TransferPage: React.FC = () => {
  const [alias, setAlias] = useState("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!alias.trim()) {
      alert("Please enter a valid alias.");
      return;
    }
    navigate("/transfer/amount", { state: { recipientAlias: alias } });
  };

  return (
    <div className="min-h-screen bg-[#131A1A] flex flex-col pb-16">
      <div className="p-4 flex-grow">
        <h1 className="text-2xl font-bold text-white mb-6">Send Money</h1>
        <InputField
          id="alias"
          label="Recipient Alias"
          type="text"
          placeholder="Enter recipient alias"
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
          icon={<UserCircleIcon />} // Example icon
          required
        />
        <div className="mt-8">
          <AuthButton onClick={handleContinue} fullWidth={true}>
            Continue
          </AuthButton>
        </div>
      </div>
      <BottomNavigationBar />
    </div>
  );
};

export default TransferPage;
