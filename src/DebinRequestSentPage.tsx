import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BottomNavigationBar from './components/BottomNavigationBar';
import AuthButton from './components/AuthButton';
import CheckCircleIcon from './components/icons/CheckCircleIcon';

const DebinRequestSentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { amount, recipient } = location.state || { amount: 0, recipient: 'N/A' }; // Default values

  const handleDone = () => {
    navigate('/home'); // Navigate back to home or transactions page
  };

  return (
    <div className="min-h-screen bg-[#131A1A] flex flex-col justify-center items-center pb-16 px-4">
      <div className="text-center">
        <CheckCircleIcon className="w-20 h-20 text-teal-400 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-white mb-4">DEBIN Request Sent</h1>
        
        {/* This is a simplified display. In a real app, you might show more details */}
        <div className="bg-gray-800 p-4 rounded-lg shadow mb-8 w-full max-w-sm">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Destination:</span>
            <span className="text-white font-medium">{recipient}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Type:</span>
            <span className="text-white font-medium">Alias</span> {/* Assuming Alias for now */}
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Amount:</span>
            <span className="text-white font-medium">${amount.toFixed(2)}</span>
          </div>
        </div>

        <AuthButton onClick={handleDone} fullWidth={true}>
          Done
        </AuthButton>
      </div>
      <div className="absolute bottom-0 left-0 right-0">
         <BottomNavigationBar />
      </div>
    </div>
  );
};

export default DebinRequestSentPage; 