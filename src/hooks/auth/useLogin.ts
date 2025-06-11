import usePost from "../usePost";
import type { LoginRequest, AuthResponse } from "../../types/api";
import { saveAuthToken } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [call, { data, loading, error }] = usePost({ path: "/api/auth/login", skipAuth: true });
  const navigate = useNavigate();

  const login = async (
    userData: LoginRequest,
  ): Promise<AuthResponse | null> => {
    try {
      const response = (await call(userData)) as AuthResponse;
      if (response && response.token) {
        saveAuthToken(response.token);
        navigate("/home");
        return response;
      }
      throw new Error("Login failed: No access token received");
    } catch (err) {
      console.error("Login hook error:", err);
      throw err;
    }
  };

  return { login, data: data as AuthResponse | null, loading, error };
};
