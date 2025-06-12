import React from "react";
import BottomNavigationBar from "./components/BottomNavigationBar";
import { useAccountBalance } from "./hooks/account/useAccountBalance";
import { useAccountDetails } from "./hooks/account/useAccountDetails";
import { useAuth } from "./context/AuthContext";

// BalanceCard now receives alias and balance as props
interface BalanceCardProps {
  alias: string;
  balance: number;
}
const BalanceCard: React.FC<BalanceCardProps> = ({ alias, balance }) => {
  return (
    <div className="bg-gradient-to-br from-teal-500 to-cyan-600 p-6 rounded-xl shadow-lg text-white mx-4 mt-6">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-semibold">Welcome, {alias}!</h2>
        <span className="bg-white/20 text-xs font-medium px-2.5 py-0.5 rounded-full">
          Virtual
        </span>
      </div>
      <p className="text-sm text-teal-100 mt-2">Your balance</p>
      <p className="text-4xl font-bold mt-1">U$D {balance.toFixed(1)}</p>
    </div>
  );
};

const ActivityHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center px-4 mt-8 mb-4">
      <h3 className="text-lg font-semibold text-white">ACTIVITY</h3>
      <button className="text-teal-400 text-sm font-medium hover:text-teal-300">
        All &gt;
      </button>
    </div>
  );
};

const HomePage: React.FC = () => {
  const { authData } = useAuth();
  const accountId = authData?.id ?? null;
  const {
    data: balanceData,
    loading: balanceLoading,
    error: balanceError,
    fetchBalance,
  } = useAccountBalance(accountId);
  const {
    data: accountDetails,
    loading: detailsLoading,
    error: detailsError,
    fetchDetails,
  } = useAccountDetails(accountId);
  const loading = accountId === null || balanceLoading || detailsLoading;
  const error = balanceError || detailsError;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#131A1A] flex flex-col items-center justify-center pb-16">
        <p className="text-white text-xl">Loading account...</p>
        <BottomNavigationBar />
      </div>
    );
  }

  if (error || !balanceData || !accountDetails) {
    return (
      <div className="min-h-screen bg-[#131A1A] flex flex-col items-center justify-center pb-16">
        <p className="text-red-500 text-xl">Error loading account data.</p>
        <button
          onClick={() => {
            fetchBalance();
            fetchDetails();
          }}
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
      {" "}
      {/* Added pb-16 for bottom nav space */}
      <BalanceCard alias={accountDetails.alias} balance={balanceData.balance} />
      <ActivityHeader />
      {/* Placeholder for Activity List */}
      <div className="flex-grow px-4">
        <p className="text-gray-400 text-center mt-10">No recent activity.</p>
      </div>
      <BottomNavigationBar />
    </div>
  );
};

export default HomePage;
