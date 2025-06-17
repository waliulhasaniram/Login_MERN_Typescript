// src/logic/updateUserLogic.ts
import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../contextAPI/Store";
import { useUpdateUserMutation } from "../query/updateUserQuery";

export const useUpdateUserLogic = () => {
  const api_link = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
  const navigate = useNavigate();
  const location = useLocation();
  const { authorizationToken } = useAuth();

  const { username = "", email = "", _id = "" } = location.state || {};

  const [data, setData] = useState({
    username,
    email,
  });

  const updateUserMutation = useUpdateUserMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserMutation.mutate(
      {
        id: _id,
        data,
        authorizationToken,
        api_link,
      },
      {
        onSuccess: (result) => {
          console.log("Update successful:", result);
          navigate("/");
          window.location.reload();
        },
        onError: (error) => {
          console.error("Error updating data:", error);
        },
      }
    );
  };

  return {
    data,
    handleChange,
    handleSubmit,
    location,
    updateUserMutation,
  };
};
