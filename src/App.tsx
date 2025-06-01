import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import CreateAccount from './CreateAccount';
import HomePage from './HomePage';
import TransferPage from './TransferPage';
import SettingsPage from './SettingsPage';
import TransactionsPage from './TransactionsPage';
import EnterDebinAmountPage from './EnterDebinAmountPage';
import DebinRequestSentPage from './DebinRequestSentPage';

// Placeholder components for other routes
// const TransferPage = () => <div className="p-4 text-white">Transfer Page Content</div>;
// const TransactionsPage = () => <div className="p-4 text-white">Transactions Page Content</div>;

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/transfer" element={<TransferPage />} />
      <Route path="/transactions" element={<TransactionsPage />} />
      <Route path="/settings" element={<SettingsPage />} />

      {/* DEBIN Flow Routes */}
      <Route path="/debin/enter-amount" element={<EnterDebinAmountPage />} />
      <Route path="/debin/request-sent" element={<DebinRequestSentPage />} />

      {/* Default redirect to home page if logged in, otherwise login */}
      {/* For now, always redirect to login if no match, 
          assuming no auth state is handled yet */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
