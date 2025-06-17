// src/hooks/updateUserQuery.ts
import { useMutation } from "@tanstack/react-query";

interface UpdatePayload {
  id: string;
  data: {
    username: string;
    email: string;
  };
  authorizationToken?: string;
  api_link: string;
}

export function useUpdateUserMutation() {
  return useMutation({
    mutationFn: async ({
      id,
      data,
      authorizationToken,
      api_link,
    }: UpdatePayload) => {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      if (authorizationToken) {
        headers["Authorization"] = authorizationToken;
      }

      const response = await fetch(`${api_link}/update/${id}`, {
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
