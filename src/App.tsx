import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import CreateAccount from './CreateAccount';
import HomePage from './HomePage';

// Placeholder components for other routes
const TransferPage = () => <div className="p-4 text-white">Transfer Page Content</div>;
const TransactionsPage = () => <div className="p-4 text-white">Transactions Page Content</div>;
const SettingsPage = () => <div className="p-4 text-white">Settings Page Content</div>;

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/transfer" element={<TransferPage />} />
      <Route path="/transactions" element={<TransactionsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      {/* Default redirect to home page if logged in, otherwise login */}
      {/* For now, always redirect to login if no match, 
          assuming no auth state is handled yet */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
