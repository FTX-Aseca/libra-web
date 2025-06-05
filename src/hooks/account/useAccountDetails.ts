import React from 'react';
import { useGet } from '../useGet';
import type { AccountDetails } from '../../types/api';

export const useAccountDetails = (accountId: number) => {
  const path = React.useMemo(() => `/api/accounts/${accountId}`, [accountId]);
  const { data, loading, error, call: fetchDetails } = useGet<AccountDetails>({
    path,
  });

  return { data: data as AccountDetails | null, loading, error, fetchDetails };
}; 