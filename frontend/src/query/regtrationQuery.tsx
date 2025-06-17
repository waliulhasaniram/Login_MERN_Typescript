import { useMutation } from "@tanstack/react-query";

interface RegData {
  username: string;
  email: string;
  password: string;
}

export function useRegistrationMutation(
  regData: RegData,
  setRegData: (data: RegData) => void,
  navigate: (path: string) => void,
  api_link: string
) {
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${api_link}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(regData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Registration failed");
      return data;
    },
    onSuccess: () => {
      setRegData({ username: "", email: "", password: "" });
      navigate("/signin");
      window.location.reload();
    },
    onError: (error: unknown) => {
      console.error("Registration error:", error);
    },
  });
}