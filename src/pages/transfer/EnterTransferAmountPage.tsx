import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BottomNavigationBar from '../../components/BottomNavigationBar';
import InputField from '../../components/InputField';
import AuthButton from '../../components/AuthButton';
import DollarSignIcon from '../../components/icons/DollarSignIcon';
import { useTransfer } from '../../hooks/transfers/useTransfer';
import { IdentifierType } from '../../types/api';

const EnterTransferAmountPage: React.FC = () => {
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { recipientAlias, transferType } = (location.state as { recipientAlias: string; transferType: IdentifierType }) || { recipientAlias: 'Unknown', transferType: IdentifierType.ALIAS };
  const { transfer, loading } = useTransfer();

  const handleConfirmTransfer = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please enter a valid amount.');
      return;
    }
    try {
      await transfer({
        toIdentifier: recipientAlias,
        identifierType: transferType,
        amount: parseFloat(amount),
      });
      navigate('/transfer/sent', { state: { amount: parseFloat(amount), recipientAlias } });
    } catch (err) {
      console.error('Transfer error:', err);
      alert('Error sending transfer');
    }
  };

  return (
    <div className="min-h-screen bg-[#131A1A] flex flex-col pb-16">
      <div className="p-4 flex-grow">
        <h1 className="text-2xl font-bold text-white mb-2">Send to:</h1>
        <p className="text-lg text-teal-400 mb-6">{recipientAlias}</p>
        
        <InputField
          id="amount"
          label="Amount to Transfer"
          type="number"
          placeholder="0.00"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          icon={<DollarSignIcon />} // Assuming DollarSignIcon exists
          required
        />
        <div className="mt-8">
          <AuthButton onClick={handleConfirmTransfer} fullWidth={true} disabled={loading}>
            Confirm Transfer
          </AuthButton>
        </div>
      </div>
      <BottomNavigationBar />
    </div>
  );
};

export default EnterTransferAmountPage; 