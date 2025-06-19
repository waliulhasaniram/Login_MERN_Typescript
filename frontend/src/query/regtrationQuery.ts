import { useMutation } from "@tanstack/react-query";

interface RegData {
  username: string;
  email: string;
  password: string;
}

export function useRegistrationMutation(
  regData: RegData
) {
  return useMutation({
    mutationFn: async () => {
      const apiLink = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
      const response = await fetch(`${apiLink}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(regData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");
      return data;
    },
  });
}