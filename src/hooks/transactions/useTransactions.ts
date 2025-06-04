import React from 'react';
import usePost from '../usePost';
import { useGet } from '../useGet';
import type { TransactionRequest, TransactionResponse } from '../../types/api';

export const useGetAccountTransactions = (accountId: number) => {
  const path = React.useMemo(() => `/api/accounts/${accountId}/transactions`, [accountId]);
  const { data, loading, error, call: fetchTransactions } = useGet<TransactionResponse[]>({
    path: path,
  });

  return { data, loading, error, fetchTransactions };
};

export const useCreateTransaction = (accountId: number) => {
  const [call, { data, loading, error }] = usePost({
    path: `/api/accounts/${accountId}/transactions`,
  });

  const createTransaction = async (transactionData: TransactionRequest): Promise<TransactionResponse | null> => {
    try {
      const response = await call(transactionData);
      return response as TransactionResponse;
    } catch (err: any) {
      console.error('Create transaction hook error:', err);
      // Add more detailed logging for Axios errors
      if (err && err.isAxiosError && err.response) {
        console.error('Axios error details:', {
          data: err.response.data,
          status: err.response.status,
          headers: err.response.headers,
        });
      } else if (err && err.message) {
        console.error('Error message:', err.message);
      }
      throw err; // Re-throw the error so the calling code knows about it
    }
  };

  return { createTransaction, data: data as TransactionResponse | null, loading, error };
}; 