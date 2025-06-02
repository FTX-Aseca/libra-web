import { useState, useCallback } from 'react';
import axios from 'axios';
import { API_URL } from './utils/routes';

type UsePostProps = {
  path: string;
  headers?: Record<string, string>;
  onSuccess?: (body?: any) => void;
  onError?: (error?: any) => void;
};
export default function usePost({
  path,
  headers = {},
  onSuccess = () => {},
  onError = () => {}
}: UsePostProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  const [data, setData] = useState(null);

  const call = useCallback(
    async (body: any) => {
      setLoading(true);
      setError(undefined);
      try {
        const response = await axios.post(`${API_URL}${path}`, body, {
          headers: { ...headers, 'Content-Type': 'application/json' }
        });
        setData(response.data);
        if (onSuccess) {
          onSuccess(response.data);
          return response.data;
        }
      } catch (err: any) {
        setError(err);
        if (onError) {
          onError(err);
        }
      }
      setLoading(false);
    },
    [path, headers, onSuccess, onError]
  );

  return [call, { data, loading, error }] as const;
}
