import usePost from '../usePost';
import { usePendingTransfers } from './usePendingTransfers';
import type { DebinRequestDto, DebinResponse, TopUpRequest, TopUpResponse } from '../../types/api';

export const useExternalTransfers = () => {
  const { addPendingTransfer, removePendingTransfer } = usePendingTransfers();
  
  const [debinCall, { loading: debinLoading, error: debinError }] = usePost({ path: '/api/debin/request' });
  const [topUpCall, { loading: topUpLoading, error: topUpError }] = usePost({ path: '/api/topup' });
  const [debinCallbackCall] = usePost({ path: '/api/debin/callback' });
  const [topUpCallbackCall] = usePost({ path: '/api/topup/callback' });

  const requestDebin = async (requestData: DebinRequestDto) => {
    const response = await debinCall(requestData) as DebinResponse;
    if (response) {
      addPendingTransfer({ ...response, type: 'DEBIN' });
    }
    return response;
  };

  const requestTopUp = async (requestData: TopUpRequest) => {
    const response = await topUpCall(requestData) as TopUpResponse;
    if (response) {
      addPendingTransfer({ ...response, type: 'TOPUP' });
    }
    return response;
  };

  const checkTransferStatus = async (id: string, type: 'DEBIN' | 'TOPUP') => {
    try {
      if (type === 'DEBIN') {
        await debinCallbackCall({ id });
      } else {
        await topUpCallbackCall({ id });
      }
      removePendingTransfer(id);
      // You might want to trigger a refresh of the main transactions list here
    } catch (error) {
      console.error(`Failed to check status for ${type} ${id}`, error);
      // Handle error appropriately, maybe show a notification
    }
  };

  return {
    requestDebin,
    requestTopUp,
    checkTransferStatus,
    loading: debinLoading || topUpLoading,
    error: debinError || topUpError,
  };
}; 