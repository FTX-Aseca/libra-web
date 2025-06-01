import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigationBar from './components/BottomNavigationBar';
import InputField from './components/InputField';
import AuthButton from './components/AuthButton';
import DollarSignIcon from './components/icons/DollarSignIcon';

const EnterDebinAmountPage: React.FC = () => {
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  // In a real app, you might get recipient info from route state or context
  // const location = useLocation();
  // const { recipient } = location.state || { recipient: 'Unknown' };

  const handleConfirm = () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount.');
      return;
    }
    // Placeholder: In a real app, call API to create DEBIN request
    // For now, navigate to success screen with amount
    navigate('/debin/request-sent', { state: { amount: parseFloat(amount) } });
  };

  return (
    <div className="min-h-screen bg-[#131A1A] flex flex-col pb-16">
      <div className="p-4 flex-grow">
        <h1 className="text-2xl font-bold text-white mb-6">Enter DEBIN Amount</h1>
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
        <AuthButton onClick={handleConfirm} fullWidth={true}>
          Confirm
        </AuthButton>
      </div>
      <BottomNavigationBar />
    </div>
  );
};

export default EnterDebinAmountPage; 