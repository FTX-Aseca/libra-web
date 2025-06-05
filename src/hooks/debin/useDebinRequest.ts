import usePost from '../usePost';
import type { DebinRequestDto, DebinResponse } from '../../types/api';

export const useDebinRequest = () => {
  const [call, { data, loading, error }] = usePost({
    path: '/api/debin/request',
  });

  const requestDebin = async (requestData: DebinRequestDto): Promise<DebinResponse> => {
    const response = await call(requestData);
    return response as DebinResponse;
  };

  return { requestDebin, data: data as DebinResponse | null, loading, error };
}; 