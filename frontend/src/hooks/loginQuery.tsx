import { useMutation } from "@tanstack/react-query";

interface LoginData {
  email: string;
  password: string;
}

interface StoreAccessTokenFn {
  (token: string): void;
}

export function useLoginMutation(
  loginData: LoginData,
  setLoginData: (data: LoginData) => void,
  navigate: (path: string) => void,
  api_link: string,
  storeAccessToken: StoreAccessTokenFn
) {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${api_link}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
        //credentials: "include", // optional if using cookies
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      return data;
    },
    onSuccess: (data) => {
      storeAccessToken(data.data.accessToken);
      setLoginData({ email: "", password: "" });
      navigate("/");
      window.location.reload();
    },
    onError: (error: unknown) => {
      console.error("Login error:", error);
    },
  });
}