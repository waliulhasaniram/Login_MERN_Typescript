import Input from "./common/Input";
import { useUpdatePasswordLogic } from "../hooks/useUpdatePasswordLogic";

const PasswordUpdate = () => {
  const { data, handleChange, handleSubmit, location } = useUpdatePasswordLogic();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-3xl bg-gray-900 text-gray-100">
      <h1 className="text-3xl font-bold mb-6">Update your password</h1>
      <form onSubmit={handleSubmit}>
        <h2>username: {location.state?.username}</h2>
        <h2 className="pb-5">email: {location.state?.email}</h2>
        <Input
          label="Old Password"
          type="password"
          name="oldPassword"
          value={data.oldPassword}
          onChange={handleChange}
          placeholder="Old Password"
        />
        <Input
          label="New Password"
          type="password"
          name="newPassword"
          value={data.newPassword}
          onChange={handleChange}
          placeholder="New Password"
        />
        <button type="submit" className="text-red-500">
          Update password
        </button>
      </form>
    </div>
  );
};

export default PasswordUpdate;
