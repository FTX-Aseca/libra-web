import usePost from '../usePost';
import type { LoginRequest } from '../../types/api';

export const useLogin = () => {
  const [call, { data, loading, error }] = usePost({ path: '/api/auth/login' });

  // TODO: Define expected response type and replace 'any'
  const login = async (userData: LoginRequest) => {
    return call(userData) as Promise<any>; 
  };

  return { login, data, loading, error };
}; 