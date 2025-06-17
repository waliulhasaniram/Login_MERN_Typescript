import { useState } from "react";
import { useNavigate } from "react-router";
import { useLoginMutation } from "../query/loginQuery";
import { useAuth } from "../contextAPI/Store";

interface LoginData {
  email: string;
  password: string;
}

export const useLoginLogic = () => {
  const api_link = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
  const navigate = useNavigate();
  const { storeAccessToken } = useAuth();

  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const loginMutation = useLoginMutation(
    loginData,
    setLoginData,
    navigate,
    api_link,
    storeAccessToken
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  return {
    loginData,
    handleInputChange,
    handleSubmit,
    loginMutation,
  };
};
