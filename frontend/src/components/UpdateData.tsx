import { useState } from "react";
import Input from "./common/Input";
import { Navigate, useLocation, useNavigate } from "react-router";
import { useAuth } from "../contextAPI/Store";
import { useMutation } from "@tanstack/react-query";

const UpdateData = () => {
     const api_link = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
     const navigate = useNavigate();
    const auth = useAuth();
    const authorizationToken = auth.authorizationToken;
    const location = useLocation();

    const { username = '', email = '' } = location.state || {};
  
    const [data, setData] = useState({
      username,
      email,
    });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

 const updateUserMutation = useMutation({
  mutationFn: async ({
    id,
    data,
    authorizationToken,
    api_link,
  }: {
    id: string;
    data: any;
    authorizationToken?: string;
    api_link: string;
  }) => {
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

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  updateUserMutation.mutate(
    {
      id: location.state._id,
      data,
      authorizationToken,
      api_link,
    },
    {
      onSuccess: (result) => {
        console.log("Update successful:", result);
        // Optionally, show a success message or redirect
      },
      onError: (error) => {
        console.error("Error updating data:", error);
        // Optionally, show an error message
      },
    }
  );
};

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Name"
        type="text"
        name="username"
        value={data.username}
        onChange={handleChange}
        placeholder="Name"
      />
      <Input
        label="Email"
        type="email"
        name="email"
        value={data.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <button type="submit">Update</button>
    </form>
  );
}

export default UpdateData;