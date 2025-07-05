// src/hooks/updateUserQuery.ts
import { useMutation } from "@tanstack/react-query";

interface UpdatePayload {
  id: string;
  data: {
    username: string;
    email: string;
  };
  authorizationToken?: string;

}

export function useUpdateUserMutation() {
  return useMutation({
    mutationFn: async ({
      id,
      data,
      authorizationToken
    }: UpdatePayload) => {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      if (authorizationToken) {
        headers["Authorization"] = authorizationToken;
      }
      const apiLink = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
      const response = await fetch(`${apiLink}/update/${id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(data),
      });

      const resData = await response.json();
      if (!response.ok) throw new Error(resData.message || "Update failed");
      return resData;
    },
  });
}
