import usePost from '../usePost';
import type { RegisterRequest } from '../../types/api';

export const useRegister = () => {
  const [call, { data, loading, error }] = usePost({ path: '/api/auth/register' });

  const register = async (userData: RegisterRequest) => {
    // TODO: Define expected response type and replace 'any'
    return call(userData) as Promise<any>; 
  };

  return { register, data, loading, error };
}; 