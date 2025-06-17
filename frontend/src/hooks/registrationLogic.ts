import { useState } from "react";
import { useRegistrationMutation } from "../query/regtrationQuery";

interface RegData {
  username: string;
  email: string;
  password: string;
}

export const useRegistrationLogic = (navigate: (path: string) => void) => {
  const api_link = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

  const [regData, setRegData] = useState<RegData>({
    username: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegData((prev) => ({ ...prev, [name]: value }));
  };

  const registrationMutation = useRegistrationMutation(regData, setRegData, navigate, api_link);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registrationMutation.mutate();
  };

  return {
    regData,
    handleInputChange,
    handleSubmit,
  };
};
