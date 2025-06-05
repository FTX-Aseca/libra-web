import usePost from '../usePost';
import type { TransferRequest, TransferResponse } from '../../types/api';

export const useTransfer = () => {
  const [call, { data, loading, error }] = usePost({
    path: '/api/transfers',
  });

  const transfer = async (requestData: TransferRequest): Promise<TransferResponse> => {
    const response = await call(requestData);
    return response as TransferResponse;
  };

  return { transfer, data: data as TransferResponse | null, loading, error };
}; 