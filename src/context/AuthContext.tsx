import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../hooks/utils/routes';
import { saveAuthToken, removeAuthToken, getAuthToken } from '../utils/auth';
import type { AccountDetails } from '../types/api';

export interface AuthData {
  token: string;
  email: string;
  alias: string;
  cvu: string;
  id: number;
}

interface AuthContextType {
  authData: AuthData | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: unknown;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authData, setAuthData] = useState<AuthData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const navigate = useNavigate();

  // On mount, initialize from stored token
  useEffect(() => {
    const token = getAuthToken();
    if (!token) return;
    try {
      const decoded = jwtDecode<{ sub: string }>(token);
      const id = Number(decoded.sub);
      axios
        .get<AccountDetails>(`${API_URL}/api/accounts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((resp) => {
          const { email, alias, cvu } = resp.data;
          setAuthData({ token, email, alias, cvu, id });
        })
        .catch((err) => {
          console.error('Failed to load auth data:', err);
          removeAuthToken();
        });
    } catch (err) {
      console.error('Invalid token:', err);
      removeAuthToken();
    }
  }, []);

  const login = async (emailParam: string, passwordParam: string) => {
    setLoading(true);
    setError(null);
    try {
      const resp = await axios.post<{ token: string }>(
        `${API_URL}/api/auth/login`,
        { email: emailParam, password: passwordParam }
      );
      const token = resp.data.token;
      saveAuthToken(token);
      const decoded = jwtDecode<{ sub: string }>(token);
      const id = Number(decoded.sub);
      const detailsResp = await axios.get<AccountDetails>(
        `${API_URL}/api/accounts/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { email, alias, cvu } = detailsResp.data;
      const data: AuthData = { token, email, alias, cvu, id };
      setAuthData(data);
      navigate('/home');
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    removeAuthToken();
    setAuthData(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}; 