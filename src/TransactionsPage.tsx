import React from 'react';
import BottomNavigationBar from './components/BottomNavigationBar';
import ArrowUpCircleIcon from './components/icons/ArrowUpCircleIcon';
import ArrowDownCircleIcon from './components/icons/ArrowDownCircleIcon';
// Removed RefreshIcon for now as its usage was tied to mock data specifics
// import RefreshIcon from './components/icons/RefreshIcon';
import { useGetAccountTransactions } from './hooks/transactions/useTransactions';
// Import TransactionType (enum) as a value
import { TransactionType as ApiTransactionType } from './types/api';
// Import TransactionResponse as a type
import type { TransactionResponse } from './types/api';

// The TransactionItem component will now accept TransactionResponse
const TransactionItem: React.FC<TransactionResponse & { index: number }> = ({
  type,
  description,
  amount,
  timestamp,
  index, // Using index as key if no ID is present
}) => {
  // Determine icon and colors based on transaction type and amount
  const isIncome = type === ApiTransactionType.INCOME; // Or check amount > 0 if type isn't definitive
  const icon = isIncome ? (
    <ArrowUpCircleIcon className="w-8 h-8 text-green-400" />
  ) : (
    <ArrowDownCircleIcon className="w-8 h-8 text-red-400" />
  );
  const amountColor = isIncome ? 'text-green-400' : 'text-red-400';
  const formattedAmount = `${isIncome ? '+' : '-'}U$D ${Math.abs(amount).toFixed(2)}`;
  const displayDescription = description || 'No description';
  
  // Format timestamp - assuming it's a string that can be displayed or needs formatting
  // For a more robust solution, consider using a date formatting library
  const formattedTimestamp = timestamp ? new Date(timestamp).toLocaleDateString() : 'Date unknown';

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-700">
      <div className="flex items-center">
        {icon}
        <div className="ml-3">
          <p className={`text-sm font-medium text-white`}>{isIncome ? 'Income' : 'Expense'}</p>
          <p className={`text-xs text-gray-400`}>{displayDescription}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-sm font-semibold ${amountColor}`}>{formattedAmount}</p>
        {formattedTimestamp && <p className="text-xs text-gray-500 mr-1">{formattedTimestamp}</p>}
      </div>
    </div>
  );
};

const TransactionsPage: React.FC = () => {
  const accountId = 1;
  const { data: transactions, loading, error, fetchTransactions } = useGetAccountTransactions(accountId);

  if (loading && (!transactions || transactions.length === 0)) {
    return (
      <div className="min-h-screen bg-[#131A1A] flex flex-col items-center justify-center pb-16">
        <p className="text-white text-xl">Loading transactions...</p>
        <BottomNavigationBar />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#131A1A] flex flex-col items-center justify-center pb-16">
        <p className="text-red-500 text-xl">Error fetching transactions. Please try again.</p>
        <button 
          onClick={() => fetchTransactions()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
        <BottomNavigationBar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#131A1A] flex flex-col pb-16">
      <div className="p-4 flex-grow">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Transactions</h1>
          {/* Add refresh button if needed */}
          {/* <button onClick={() => fetchTransactions()} aria-label="Refresh transactions">
            <RefreshIcon className="w-6 h-6 text-blue-400 hover:text-blue-300" />
          </button> */}
        </div>
        {transactions && transactions.length === 0 ? (
          <p className="text-gray-400 text-center mt-10">No transactions found for this account.</p>
        ) : (
          <div className="bg-gray-800 rounded-lg shadow p-2">
            {transactions?.map((tx, index) => (
              // Using index as a key because TransactionResponse doesn't have a unique ID.
              // This is not ideal if the list can change order or items can be inserted/deleted.
              // A stable, unique ID from the backend is preferred for keys.
              <TransactionItem key={index} {...tx} index={index} />
            ))}
          </div>
        )}
      </div>
      <BottomNavigationBar />
    </div>
  );
};

export default TransactionsPage; 