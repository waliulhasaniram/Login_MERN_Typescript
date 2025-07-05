import { useState } from "react";
import { useNavigate } from "react-router";
import { useLoginMutation } from "../query/loginQuery";
import { useAuth } from "../contextAPI/Store";

interface LoginData {
  email: string;
  password: string;
}

export const useLoginLogic = () => {
  const navigate = useNavigate();
  const { storeAccessToken } = useAuth();

  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const loginMutation = useLoginMutation();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginMutation.mutate(loginData, {
      onSuccess: (data) => {
        storeAccessToken(data.data.accessToken);
        setLoginData({ email: "", password: "" });
        navigate("/");
        window.location.reload();
      },
      onError: (error: unknown) => {
        console.error("Login error:", error);
      },
    });
  };

  return {
    loginData,
    handleInputChange,
    handleSubmit,
    loginMutation,
  };
};