import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../contextAPI/Store";
import { useUpdatePasswordMutation } from "../query/paswordUpdateQuery";

export const useUpdatePasswordLogic = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authorizationToken } = useAuth();

  const { _id } = location.state || {};

  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const updatePasswordMutation = useUpdatePasswordMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePasswordMutation.mutate(
      {
        id: _id,
        data,
        authorizationToken
      },
      {
        onSuccess: (resData) => {
          console.log("Password updated successfully", resData);
          alert("Password updated successfully");
          navigate("/signin");
        },
        onError: (error) => {
          console.error("Error updating password:", error);
          alert("Error updating password");
        },
      }
    );
  };

  return {
    data,
    handleChange,
    handleSubmit,
    location,
  };
};
