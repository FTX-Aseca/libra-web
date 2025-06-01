import React from 'react';
import BottomNavigationBar from './components/BottomNavigationBar';
import ArrowUpCircleIcon from './components/icons/ArrowUpCircleIcon';
import ArrowDownCircleIcon from './components/icons/ArrowDownCircleIcon';
import RefreshIcon from './components/icons/RefreshIcon';

// Placeholder transaction data - replace with actual data fetching
// Include various types to match the screenshots
type TransactionStatus = 'Received' | 'Sent' | 'Pending' | 'DEBIN Request';
interface Transaction {
  id: string;
  type: TransactionStatus;
  description: string;
  amount: string;
  dateOrId?: string; // For date or secondary ID like DEBIN ID
  icon?: React.ReactNode;
  amountColor?: string;
  statusText?: string;
  showRefresh?: boolean;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'Received',
    description: 'No description',
    amount: '+U$D 10.0',
    dateOrId: 'May 31, 2025',
    icon: <ArrowUpCircleIcon className="w-8 h-8 text-green-400" />,
    amountColor: 'text-green-400',
  },
  {
    id: '2',
    type: 'DEBIN Request',
    description: 'PENDING',
    amount: '$11111.00',
    dateOrId: 'ID: 3',
    icon: <ArrowDownCircleIcon className="w-8 h-8 text-yellow-400" />,
    amountColor: 'text-white', // Amount color can be different for DEBIN
    statusText: 'PENDING', // Specific status text
    showRefresh: true, // Show refresh icon for pending DEBIN
  },
  // Add more mock transactions as needed to represent different states
];

const TransactionItem: React.FC<Transaction> = ({ 
  type, description, amount, dateOrId, icon, amountColor, statusText, showRefresh 
}) => {
  const handleRefresh = () => {
    alert(`Refresh transaction ID: ${dateOrId}`); // Placeholder
  };
  
  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-700">
      <div className="flex items-center">
        {icon}
        <div className="ml-3">
          <p className={`text-sm font-medium ${type === 'DEBIN Request' ? 'text-yellow-400' : 'text-white'}`}>{type}</p>
          <p className={`text-xs ${statusText ? 'text-yellow-300' : 'text-gray-400'}`}>{statusText || description}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-sm font-semibold ${amountColor || 'text-white'}`}>{amount}</p>
        <div className="flex items-center justify-end">
          {dateOrId && <p className="text-xs text-gray-500 mr-1">{dateOrId}</p>}
          {showRefresh && (
            <button onClick={handleRefresh} aria-label="Refresh DEBIN status">
              <RefreshIcon className="w-4 h-4 text-blue-400 hover:text-blue-300" />
            </button>
          )}
        </div> 
      </div>
    </div>
  );
};

const TransactionsPage: React.FC = () => {
  // Placeholder for API call: const { data: transactions, isLoading } = useGetTransactions();
  const transactions = mockTransactions;

  return (
    <div className="min-h-screen bg-[#131A1A] flex flex-col pb-16">
      <div className="p-4 flex-grow">
        <h1 className="text-2xl font-bold text-white mb-6">Transactions</h1>
        {transactions.length === 0 ? (
          <p className="text-gray-400 text-center mt-10">No transactions yet.</p>
        ) : (
          <div className="bg-gray-800 rounded-lg shadow p-2">
            {transactions.map((tx) => (
              <TransactionItem key={tx.id} {...tx} />
            ))}
          </div>
        )}
      </div>
      <BottomNavigationBar />
    </div>
  );
};

export default TransactionsPage; 