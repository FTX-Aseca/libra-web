import React from "react";
import { useGet } from "../useGet";
import type { BalanceResponse } from "../../types/api";

export const useAccountBalance = (accountId: number) => {
  const path = React.useMemo(
    () => `/api/accounts/${accountId}/balance`,
    [accountId],
  );
  const {
    data,
    loading,
    error,
    call: fetchBalance,
  } = useGet<BalanceResponse>({
    path,
  });

  return { data: data as BalanceResponse | null, loading, error, fetchBalance };
};
