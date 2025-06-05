import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigationBar from './components/BottomNavigationBar';
import Tabs from './components/Tabs';
import InputField from './components/InputField';
import AuthButton from './components/AuthButton';
import UserIcon from './components/icons/UserIcon'; // Assuming UserIcon is created
import { IdentifierType } from './types/api';

// Placeholder for potential future navigation or step handling
// import { useNavigate } from 'react-router-dom';

const TransferTabContent: React.FC = () => {
  const [alias, setAlias] = useState('');
  const [transferType, setTransferType] = useState<IdentifierType>(IdentifierType.ALIAS);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (!alias.trim()) {
      alert('Please enter a valid alias.');
      return;
    }
    navigate('/transfer/amount', { state: { recipientAlias: alias, transferType } });
  };

  return (
    <div className="px-4">
      <div className="flex mb-4">
        <button 
          onClick={() => setTransferType(IdentifierType.ALIAS)}
          className={`py-2 px-4 rounded-l-md text-sm font-medium w-1/2 ${
            transferType === IdentifierType.ALIAS 
            ? 'bg-teal-500 text-white' 
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Alias
        </button>
        <button 
          onClick={() => setTransferType(IdentifierType.CVU)}
          className={`py-2 px-4 rounded-r-md text-sm font-medium w-1/2 ${
            transferType === IdentifierType.CVU 
            ? 'bg-teal-500 text-white' 
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          CVU
        </button>
      </div>
      <InputField
        id="alias"
        label={transferType} // Label changes based on type
        type="text"
        placeholder={`Enter recipient ${transferType}`}
        value={alias}
        onChange={(e) => setAlias(e.target.value)}
        icon={<UserIcon />}
      />
      <AuthButton onClick={handleContinue} fullWidth={true}>
        Continue
      </AuthButton>
    </div>
  );
};

const DebinTabContent: React.FC = () => {
  const navigate = useNavigate();
  const handleContinue = () => {
    navigate('/debin/enter-amount');
  };
  return (
    <div className="px-4">
      <p className="text-gray-400 mb-6 text-center">Request DEBIN from another account.</p>
      <AuthButton onClick={handleContinue} fullWidth={true}>
        Continue
      </AuthButton>
    </div>
  );
};

const TopUpTabContent: React.FC = () => {
  const navigate = useNavigate();
  const handleContinueTopUp = () => {
    navigate('/topup');
  };
  return (
    <div className="px-4">
      <p className="text-gray-400 mb-6 text-center">Request Top-Up</p>
      <AuthButton onClick={handleContinueTopUp} fullWidth>
        Continue
      </AuthButton>
    </div>
  );
};

const TransferPage: React.FC = () => {
  const tabs = [
    { label: 'Transfer', content: <TransferTabContent /> },
    { label: 'DEBIN', content: <DebinTabContent /> },
    { label: 'Top-Up', content: <TopUpTabContent /> },
  ];

  return (
    <div className="min-h-screen bg-[#131A1A] flex flex-col pb-16">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-white mb-6">Transfer</h1>
        <Tabs tabs={tabs} />
      </div>
      <BottomNavigationBar />
    </div>
  );
};

export default TransferPage; 