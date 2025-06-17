import Input from "./common/Input";
import { NavLink } from "react-router-dom";
import { useUpdateUserLogic } from "../hooks/updateUserLogic";

const UpdateData = () => {
  const { data, handleChange, handleSubmit, location } = useUpdateUserLogic();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-3xl bg-gray-900 text-gray-100">
      <h1 className="text-3xl font-bold mb-6">Update Data</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          type="text"
          name="username"
          value={data.username}
          onChange={handleChange}
          placeholder="Name"
        />
        <Input
          label="Email"
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <button type="submit">Update your data</button>
        <NavLink to={`/update_password/${location.state._id}`} state={location.state}>
          <button className="ml-4 text-red-600">Update password</button>
        </NavLink>
      </form>
    </div>
  );
};

export default UpdateData;
