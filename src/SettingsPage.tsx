import React from "react";
import BottomNavigationBar from "./components/BottomNavigationBar";
import CopyIcon from "./components/icons/CopyIcon";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { removeAuthToken } from "./utils/auth"; // Corrected import path
import { useAccountDetails } from "./hooks/account/useAccountDetails";
import { useAuth } from "./context/AuthContext";

interface InfoItemProps {
  label: string;
  value: string;
}

const SettingsPage: React.FC = () => {
  const { authData } = useAuth();
  const accountId = authData?.id ?? null;
  const {
    data: accountDetails,
    loading: detailsLoading,
    error: detailsError,
    fetchDetails,
  } = useAccountDetails(accountId);
  const loading = accountId === null || detailsLoading;
  const error = detailsError;
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#131A1A] flex flex-col items-center justify-center pb-16">
        <p className="text-white text-xl">Loading account settings...</p>
        <BottomNavigationBar />
      </div>
    );
  }

  if (error || !accountDetails) {
    return (
      <div className="min-h-screen bg-[#131A1A] flex flex-col items-center justify-center pb-16">
        <p className="text-red-500 text-xl">Error loading account settings.</p>
        <button
          onClick={() => fetchDetails()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
        <BottomNavigationBar />
      </div>
    );
  }

  const { email, alias, cvu } = accountDetails;

  const handleLogout = () => {
    removeAuthToken();
    navigate("/login", { replace: true });
    console.log("User logged out");
  };

  const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => {
    const handleCopy = () => {
      navigator.clipboard
        .writeText(value)
        .then(() => alert(`${label} copied to clipboard!`))
        .catch((err) => console.error("Failed to copy: ", err));
    };
    return (
      <div className="flex justify-between items-center py-4 border-b border-gray-700">
        <div>
          <p className="text-xs text-gray-400">{label}</p>
          <p className="text-white font-medium">{value}</p>
        </div>
        <button onClick={handleCopy} aria-label={`Copy ${label}`}>
          <CopyIcon />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#131A1A] flex flex-col pb-16">
      <div className="p-4 flex-grow">
        <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>
        <div className="bg-gray-800 rounded-lg shadow p-2">
          <InfoItem label="Email" value={email} />
          <InfoItem label="Alias" value={alias} />
          <InfoItem label="CVU" value={cvu} />
        </div>
        <button
          onClick={handleLogout}
          className="w-full mt-8 py-3 rounded-lg bg-red-600 text-white font-bold text-lg hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
      <BottomNavigationBar />
    </div>
  );
};

export default SettingsPage;
