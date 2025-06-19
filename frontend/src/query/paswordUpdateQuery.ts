import { useMutation } from "@tanstack/react-query";

interface PasswordUpdatePayload {
  id: string;
  data: {
    oldPassword: string;
    newPassword: string;
  };
  authorizationToken?: string;
}

export function useUpdatePasswordMutation() {
  return useMutation({
    mutationFn: async ({ id, data, authorizationToken }: PasswordUpdatePayload) => {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      if (authorizationToken) {
        headers["Authorization"] = authorizationToken;
      }

      const apiLink = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
      const response = await fetch(`${apiLink}/update-password/${id}`, {
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
