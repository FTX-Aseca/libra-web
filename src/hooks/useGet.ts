import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { API_URL } from './utils/routes';
import { getAuthToken } from '../utils/auth'; // Import token utility

type Props = {
  path: string;
  headers?: Record<string, string>;
  onSuccess?: (data: any) => void;
  onError?: (error?: any) => void; // Added error param to onError
  lazy?: boolean; // Added lazy option
};

export const useGet = <T>({
  path,
  headers = {},
  onSuccess = () => {},
  onError = () => {},
  lazy = false // Default to not lazy
}: Props) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!lazy); // Only set loading true if not lazy
  const [error, setError] = useState<any | null>(null);

  const fetchData = useCallback(async (fetchPath?: string, fetchHeaders?: Record<string, string>) => {
    setLoading(true);
    setError(null);
    const token = getAuthToken();
    const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};
    const currentPath = fetchPath || path;
    const currentHeaders = { ...headers, ...fetchHeaders, ...authHeaders };

    try {
      const response = await axios.get(`${API_URL}${currentPath}`, { headers: currentHeaders });
      setData(response.data as T);
      if (onSuccess) onSuccess(response.data);
      setLoading(false);
      return response.data as T;
    } catch (err: any) {
      setError(err);
      if (onError) onError(err);
      setLoading(false);
      throw err;
    }
  }, [path, headers, onSuccess, onError]); // Dependencies for fetchData

  useEffect(() => {
    if (!lazy) {
      fetchData();
    }
    // Cleanup function if needed, e.g., for cancelling requests
    // return () => { /* cancel axios request if component unmounts */ };
  }, [lazy, fetchData]); // fetchData is now a dependency

  return {
    data,
    loading,
    error,
    call: fetchData // Expose fetchData for lazy loading
  };
};
