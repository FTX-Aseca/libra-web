import usePost from '../usePost';
import type { TopUpRequest, TopUpResponse } from '../../types/api';

export const useTopUp = () => {
  const [call, { data, loading, error }] = usePost({
    path: '/api/topup',
  });

  const topUp = async (requestData: TopUpRequest): Promise<TopUpResponse> => {
    const response = await call(requestData);
    return response as TopUpResponse;
  };

  return { topUp, data: data as TopUpResponse | null, loading, error };
}; 