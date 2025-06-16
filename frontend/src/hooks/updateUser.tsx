import { useMutation } from "@tanstack/react-query";

interface UpdateUserArgs {
  id: string;
  data: any;
  authorizationToken?: string;
  api_link: string;
}

export function useUpdateUserMutation() {
  return useMutation({
    mutationFn: async ({ id, data, authorizationToken, api_link }: UpdateUserArgs) => {
      const headers: HeadersInit = {
        "Content-Type": "application/json",
      };
      if (authorizationToken) {
        headers["Authorization"] = authorizationToken;
      }
      const response = await fetch(`${api_link}/update/${id}`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    },
  });
}