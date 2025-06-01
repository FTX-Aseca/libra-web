import React from 'react';
import BottomNavigationBar from './components/BottomNavigationBar';
import CopyIcon from './components/icons/CopyIcon';
// import { useNavigate } from 'react-router-dom'; // For logout redirection

// Placeholder user data - replace with actual data from context or props
const userSettingsData = {
  email: 'test_user@gmail.com',
  alias: 'sunny.mountain.535',
  cvu: '7915439156658262033234',
};

interface InfoItemProps {
  label: string;
  value: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ label, value }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(value)
      .then(() => alert(`${label} copied to clipboard!`))
      .catch(err => console.error('Failed to copy: ', err));
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

const SettingsPage: React.FC = () => {
  // const navigate = useNavigate();

  const handleLogout = () => {
    // Placeholder: Implement actual logout logic (clear auth state, etc.)
    alert('Logout clicked');
    // navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#131A1A] flex flex-col pb-16">
      <div className="p-4 flex-grow">
        <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>
        <div className="bg-gray-800 rounded-lg shadow p-2">
          <InfoItem label="Email" value={userSettingsData.email} />
          <InfoItem label="Alias" value={userSettingsData.alias} />
          <InfoItem label="CVU" value={userSettingsData.cvu} />
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