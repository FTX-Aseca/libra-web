import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from './utils/routes';

type Props = {
  path: string;
  headers?: Record<string, string>;
  onSuccess?: (data: any) => void;
  onError?: () => void;
};

export const useGet = <T>({
  path,
  headers = {},
  onSuccess = () => {},
  onError = () => {}
}: Props) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}${path}`, { headers })
      .then(response => {
        setData(response.data);
        onSuccess(response.data);
      })
      .catch(error => {
        setError(error);
        onError();
      })
      .finally(() => {
        setLoading(false);
      });
  }, [path]);

  return {
    data: data as T,
    loading,
    error
  };
};
