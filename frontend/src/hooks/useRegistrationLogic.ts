import { useState } from "react";
import { useNavigate } from "react-router";
import { useRegistrationMutation } from "../query/regtrationQuery";

interface RegData {
  username: string;
  email: string;
  password: string;
}

export const useRegistrationLogic = () => {
  const navigate = useNavigate();

  const [regData, setRegData] = useState<RegData>({
    username: "",
    email: "",
    password: "",
  });

  const registrationMutation = useRegistrationMutation(regData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    registrationMutation.mutate(undefined, {
      onSuccess: () => {
        setRegData({ username: "", email: "", password: "" });
        navigate("/signin");
        window.location.reload();
      },
      onError: (error: unknown) => {
        console.error("Registration error:", error);
      },
    });
  };

  return {
    regData,
    handleInputChange,
    handleSubmit,
  };
};