import React, { useMemo } from "react";
import BottomNavigationBar from "./components/BottomNavigationBar";
import ArrowUpCircleIcon from "./components/icons/ArrowUpCircleIcon";
import ArrowDownCircleIcon from "./components/icons/ArrowDownCircleIcon";
import RefreshIcon from "./components/icons/RefreshIcon";
import { useGetAccountTransactions } from "./hooks/transactions/useTransactions";
import type { Transaction } from "./hooks/transactions/useTransactions";
import { usePendingTransfers } from "./hooks/transactions/usePendingTransfers";
import type { PendingTransfer } from "./hooks/transactions/usePendingTransfers";
import { useExternalTransfers } from "./hooks/transactions/useExternalTransfers";
import { TransactionType as ApiTransactionType } from "./types/api";
import { useAuth } from "./context/AuthContext";

type CombinedTransaction = (Transaction | PendingTransfer) & {
  isPending?: boolean;
};

const TransactionItem: React.FC<Transaction> = ({
  type,
  description,
  amount,
  timestamp,
}) => {
  const isIncome = type === ApiTransactionType.INCOME;
  const icon = isIncome ? (
    <ArrowUpCircleIcon className="w-8 h-8 text-green-400" />
  ) : (
    <ArrowDownCircleIcon className="w-8 h-8 text-red-400" />
  );
  const amountColor = isIncome ? "text-green-400" : "text-red-400";
  const formattedAmount = `${isIncome ? "+" : "-"}U$D ${Math.abs(amount).toFixed(2)}`;
  const displayDescription = description || "No description";
  const formattedTimestamp = timestamp
    ? new Date(timestamp).toLocaleDateString()
    : "Date unknown";

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-700">
      <div className="flex items-center">
        {icon}
        <div className="ml-3">
          <p className="text-sm font-medium text-white">
            {isIncome ? "Received" : "Sent"}
          </p>
          <p className="text-xs text-gray-400">{displayDescription}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-sm font-semibold ${amountColor}`}>
          {formattedAmount}
        </p>
        <p className="text-xs text-gray-500 mr-1">{formattedTimestamp}</p>
      </div>
    </div>
  );
};

const PendingTransferItem: React.FC<{
  transfer: PendingTransfer;
  onRefresh: (id: string, type: "DEBIN" | "TOPUP") => void;
}> = ({ transfer, onRefresh }) => {
  const { id, type, amount, timestamp } = transfer;

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-700">
      <div className="flex items-center">
        <ArrowDownCircleIcon className="w-8 h-8 text-yellow-400" />
        <div className="ml-3">
          <p className="text-sm font-medium text-white">
            {type === "DEBIN" ? "DEBIN Request" : "Top-Up"} (PENDING)
          </p>
          <p className="text-xs text-gray-400">ID: {id}</p>
        </div>
      </div>
      <div className="text-right flex items-center">
        <div>
          <p className="text-sm font-semibold text-white">
            ${amount.toFixed(2)}
          </p>
          <p className="text-xs text-gray-500 mr-1">
            {new Date(timestamp).toLocaleDateString()}
          </p>
        </div>
        <button onClick={() => onRefresh(id, type)} className="ml-4">
          <RefreshIcon className="w-6 h-6 text-blue-400 hover:text-blue-300" />
        </button>
      </div>
    </div>
  );
};

const TransactionsPage: React.FC = () => {
  const { authData } = useAuth();
  const accountId = authData?.id ?? null;
  const {
    data: transactions,
    loading: transactionsLoading,
    error: transactionsError,
    fetchTransactions,
  } = useGetAccountTransactions(accountId);
  const { pendingTransfers } = usePendingTransfers();
  const { checkTransferStatus } = useExternalTransfers();

  const combinedList = useMemo(() => {
    const pending: CombinedTransaction[] = pendingTransfers.map((t) => ({
      ...t,
      isPending: true,
    }));
    const settled: CombinedTransaction[] = transactions.map((t) => ({
      ...t,
      isPending: false,
    }));
    const all = [...pending, ...settled];
    return all.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );
  }, [transactions, pendingTransfers]);

  const handleRefresh = async (id: string, type: "DEBIN" | "TOPUP") => {
    await checkTransferStatus(id, type);
    fetchTransactions();
  };

  const loading =
    accountId === null || (transactionsLoading && combinedList.length === 0);
  const error = transactionsError;
  if (loading) {
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
        <p className="text-red-500 text-xl">
          Error fetching transactions. Please try again.
        </p>
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
        </div>
        {combinedList.length === 0 ? (
          <p className="text-gray-400 text-center mt-10">
            No transactions found for this account.
          </p>
        ) : (
          <div className="bg-gray-800 rounded-lg shadow p-2">
            {combinedList.map((item) =>
              item.isPending ? (
                <PendingTransferItem
                  key={(item as PendingTransfer).id}
                  transfer={item as PendingTransfer}
                  onRefresh={handleRefresh}
                />
              ) : (
                <TransactionItem
                  key={(item as Transaction).id}
                  {...(item as Transaction)}
                />
              ),
            )}
          </div>
        )}
      </div>
      <BottomNavigationBar />
    </div>
  );
};

export default TransactionsPage;
