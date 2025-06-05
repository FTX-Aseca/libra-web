import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigationBar from '../../components/BottomNavigationBar';
import InputField from '../../components/InputField';
import AuthButton from '../../components/AuthButton';
import DollarSignIcon from '../../components/icons/DollarSignIcon';
import { useExternalTransfers } from '../../hooks/transactions/useExternalTransfers';

const TopUpDetailsPage: React.FC = () => {
  const [amount, setAmount] = useState('');
  const { requestTopUp, loading } = useExternalTransfers();
  const navigate = useNavigate();

  const handleContinue = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount.');
      return;
    }
    try {
      await requestTopUp({ amount: parseFloat(amount) });
      navigate('/topup/sent', { state: { amount: parseFloat(amount) } });
    } catch (err) {
      console.error('Top-up error:', err);
      alert('Error requesting top-up');
    }
  };

  return (
    <div className="min-h-screen bg-[#131A1A] flex flex-col pb-16">
      <div className="p-4 flex-grow">
        <h1 className="text-2xl font-bold text-white mb-6">Request Top-Up</h1>
        <InputField
          id="amount"
          label="Amount to Request"
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          icon={<DollarSignIcon />}
          required
        />
        <div className="mt-8">
          <AuthButton onClick={handleContinue} fullWidth={true} disabled={loading}>
            Continue
          </AuthButton>
        </div>
      </div>
      <BottomNavigationBar />
    </div>
  );
};

export default TopUpDetailsPage; 