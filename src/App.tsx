import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import HomePage from "./HomePage";
import TransferPage from "./TransferPage";
import SettingsPage from "./SettingsPage";
import TransactionsPage from "./TransactionsPage";
import EnterDebinAmountPage from "./EnterDebinAmountPage";
import DebinRequestSentPage from "./DebinRequestSentPage";
import EnterTransferAmountPage from "./pages/transfer/EnterTransferAmountPage";
import TransferSentPage from "./pages/transfer/TransferSentPage";
import TopUpDetailsPage from "./pages/topup/TopUpDetailsPage";
import TopUpRequestSentPage from "./pages/topup/TopUpRequestSentPage";
import AuthGuard from "./components/AuthGuard";
import { getAuthToken } from "./utils/auth";

// Placeholder components for other routes
// const TransferPage = () => <div className="p-4 text-white">Transfer Page Content</div>;
// const TransactionsPage = () => <div className="p-4 text-white">Transactions Page Content</div>;

function App() {
  const isAuthenticated = !!getAuthToken();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/create-account" element={<CreateAccount />} />

      <Route element={<AuthGuard />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/transfer" element={<TransferPage />} />
        <Route path="/transfer/amount" element={<EnterTransferAmountPage />} />
        <Route path="/transfer/sent" element={<TransferSentPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/settings" element={<SettingsPage />} />

        <Route path="/debin/enter-amount" element={<EnterDebinAmountPage />} />
        <Route path="/debin/request-sent" element={<DebinRequestSentPage />} />
        <Route path="/topup" element={<TopUpDetailsPage />} />
        <Route path="/topup/sent" element={<TopUpRequestSentPage />} />
      </Route>

      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/home" : "/login"} replace />}
      />
    </Routes>
  );
}

export default App;
