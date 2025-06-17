import Input from "./common/Input";
import Button from "./common/Button";
import { useLoginLogic } from "../hooks/loginLogic";

const Login = () => {
  const { loginData, handleInputChange, handleSubmit } = useLoginLogic();

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
          onChange={handleInputChange}
          required
        />
        <Input
          label="Password:"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={loginData.password}
          onChange={handleInputChange}
          required
        />
        <Button type="submit"> Login </Button>
      </form>
    </div>
  );
};

export default Login;
