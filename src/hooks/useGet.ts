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

// Define stable defaults outside the hook
const DEFAULT_HEADERS = {};
const DEFAULT_ON_SUCCESS = () => {};
const DEFAULT_ON_ERROR = () => {};

export const useGet = <T>({
  path,
  headers = DEFAULT_HEADERS,
  onSuccess = DEFAULT_ON_SUCCESS,
  onError = DEFAULT_ON_ERROR,
  lazy = false // Default to not lazy
}: Props) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!lazy); // Only set loading true if not lazy
  const [error, setError] = useState<any | null>(null);

  const fetchData = useCallback(async (fetchPath?: string, fetchHeaders?: Record<string, string>) => {
    setLoading(true);
    setError(null);
    const token = getAuthToken();
    console.log('[useGet] Retrieved auth token:', token ? `Bearer ${token}` : 'No token found');
    const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};
    const currentPath = fetchPath || path;
    const currentHeaders = { ...headers, ...fetchHeaders, ...authHeaders };

    try {
      const response = await axios.get(`${API_URL}${currentPath}`, { headers: currentHeaders });
      setData(response.data as T);
      if (onSuccess) onSuccess(response.data);
      return response.data as T;
    } catch (err: any) {
      setError(err);
      if (onError) onError(err);
      throw err;
    } finally {
      setLoading(false); // Ensure loading is set to false in all cases
    }
  }, [path, headers, onSuccess, onError]);

  useEffect(() => {
    if (!lazy) {
      fetchData().catch(() => {
        // Catch errors from the initial fetchData call originating from useEffect
        // This prevents unhandled promise rejections if the initial fetch fails
        // The error state is already set by fetchData itself.
      });
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
