import { useState, useCallback } from "react";
import axios from "axios";
import { API_URL } from "./utils/routes";
import { getAuthToken } from "../utils/auth";

type UsePutProps = {
  path: string;
  headers?: Record<string, string>;
  onSuccess?: (body?: unknown) => void;
  onError?: (error?: unknown) => void;
};
export default function usePut({
  path,
  headers = {},
  onSuccess = () => {},
  onError = () => {},
}: UsePutProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();
  const [data, setData] = useState<unknown>(null);

  const call = useCallback(
    async (body: unknown) => {
      setLoading(true);
      setError(undefined);
      const token = getAuthToken();
      const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

      try {
        const response = await axios.put(`${API_URL}${path}`, body, {
          headers: {
            ...headers,
            "Content-Type": "application/json",
            ...authHeaders,
          },
        });
        setData(response.data);
        if (onSuccess) {
          onSuccess(response.data);
          return response.data;
        }
      } catch (err: unknown) {
        setError(err);
        if (onError) {
          onError(err);
        }
        throw err;
      }
      setLoading(false);
    },
    [path, headers, onSuccess, onError],
  );

  return [call, { data, loading, error }] as const;
}
