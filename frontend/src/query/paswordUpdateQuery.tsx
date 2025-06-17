import { useMutation } from "@tanstack/react-query";

interface PasswordUpdatePayload {
  id: string;
  data: {
    oldPassword: string;
    newPassword: string;
  };
  authorizationToken?: string;
  api_link: string;
}

export function useUpdatePasswordMutation() {
  return useMutation({
    mutationFn: async ({ id, data, authorizationToken, api_link }: PasswordUpdatePayload) => {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      if (authorizationToken) {
        headers["Authorization"] = authorizationToken;
      }

      const response = await fetch(`${api_link}/update_password/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(data),
      });

      const resData = await response.json();
      if (!response.ok) throw new Error(resData.message || "Password update failed");
      return resData;
    },
  });
}
