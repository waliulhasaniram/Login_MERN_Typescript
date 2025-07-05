import Input from "./common/Input";
import Button from "./common/Button";
import { useRegistrationLogic } from "../hooks/useRegistrationLogic";

const RegistrationForm = () => {
  const { regData, handleInputChange, handleSubmit } = useRegistrationLogic();

  return (
    <div className="min-h-screen min-w-3xl flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-white text-2xl font-bold mb-6">Register</h2>

        <Input
          label="Username"
          type="text"
          name="username"
          value={regData.username}
          onChange={handleInputChange}
          placeholder="Enter username"
          required
        />

        <Input
          label="Email"
          type="email"
          name="email"
          value={regData.email}
          onChange={handleInputChange}
          placeholder="Enter email"
          required
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={regData.password}
          onChange={handleInputChange}
          placeholder="Enter password"
          required
        />

        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default RegistrationForm;
