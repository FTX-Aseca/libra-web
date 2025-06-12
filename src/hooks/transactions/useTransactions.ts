import React from "react";
import usePost from "../usePost";
import axios from "axios";
import { useGet } from "../useGet";
import type { TransactionRequest, TransactionResponse } from "../../types/api";

// A new type that includes a client-side unique ID
export type Transaction = TransactionResponse & { id: string };

let nextId = 0;

export const useGetAccountTransactions = (accountId: number | null) => {
  const lazy = accountId === null;
  const path = React.useMemo(
    () => `/api/accounts/${accountId}/transactions`,
    [accountId],
  );
  const {
    data: rawTransactions,
    loading,
    error,
    call: fetchTransactions,
  } = useGet<TransactionResponse[]>({
    path: path,
    lazy,
  });

  const transactionsWithId = React.useMemo(() => {
    return (
      rawTransactions?.map((tx) => ({ ...tx, id: `tx-${nextId++}` })) || []
    );
  }, [rawTransactions]);

  return { data: transactionsWithId, loading, error, fetchTransactions };
};

export const useCreateTransaction = (accountId: number) => {
  const [call, { data, loading, error }] = usePost({
    path: `/api/accounts/${accountId}/transactions`,
  });

  const createTransaction = async (
    transactionData: TransactionRequest,
  ): Promise<Transaction | null> => {
    try {
      const response = (await call(transactionData)) as TransactionResponse;
      if (response) {
        return { ...response, id: `tx-${nextId++}` };
      }
      return null;
    } catch (err: unknown) {
      console.error("Create transaction hook error:", err);
      if (axios.isAxiosError(err) && err.response) {
        console.error("Axios error details:", {
          data: err.response.data,
          status: err.response.status,
          headers: err.response.headers,
        });
      } else if (err instanceof Error) {
        console.error("Error message:", err.message);
      }
      throw err; // Re-throw the error so the calling code knows about it
    }
  };

  return {
    createTransaction,
    data: data as Transaction | null,
    loading,
    error,
  };
};
