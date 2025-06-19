import { useMutation } from "@tanstack/react-query";

interface LoginData {
  email: string;
  password: string;
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: async (loginData: LoginData) => {
      const apiLink = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
      const response = await fetch(`${apiLink}/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Login failed");

      return data;
    },
  });
}