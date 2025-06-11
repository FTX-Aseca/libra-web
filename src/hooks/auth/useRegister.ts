import usePost from "../usePost";
import type { RegisterRequest, AuthResponse } from "../../types/api";

export const useRegister = () => {
  const [call, { data, loading, error }] = usePost({ path: "/api/auth/register", skipAuth: true });

  const register = async (
    userData: RegisterRequest,
  ): Promise<AuthResponse | null> => {
    // Assuming registration might return a similar AuthResponse or just a success message.
    // Adjust if your backend returns something different for registration.
    try {
      const response = (await call(userData)) as AuthResponse; // Or a different response type
      // Typically, after registration, you might redirect to login or show a success message.
      // We are not saving token or auto-logging in here.
      return response;
    } catch (err) {
      console.error("Register hook error:", err);
      throw err;
    }
  };

  return { register, data: data as AuthResponse | null, loading, error };
};
