
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contextAPI/Store";
import Input from "./common/Input";
import Button from "./common/Button";
import { useLoginMutation } from "../hooks/loginQuery";

const Login = () => {
  const api_link = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;
  const navigate = useNavigate();
  const {storeAccessToken} = useAuth();
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const name = e.target.name 
      const value = e.target.value

      setLoginData({
            ...loginData,
            [name]: value
      })
  };

  const loginMutation = useLoginMutation(loginData, setLoginData, navigate, api_link, storeAccessToken);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full max-w-4xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 p-12">
      <h1 className="text-4xl font-extrabold text-white mb-6 tracking-wide">
        Login to your account
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-2xl"
      >
        <Input
          label="Email:"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={loginData.email}
          onChange={inputHandler}
          required
        />
        <Input
          label="Password:"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={loginData.password}
          onChange={inputHandler}
          required
        />
        <Button type="submit">
          {loginMutation.isPending ? "Logging in..." : "Login"}
        </Button>
      </form>

      <div className="flex space-x-4 mt-6">
        <p className="flex justify-start">Create a new account</p>
        <NavLink to="/signup">
          <button className="px-6 py-3 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition duration-300 focus:ring-2 focus:ring-cyan-400">
            Sign up
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
