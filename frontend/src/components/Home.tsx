import { NavLink } from "react-router";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <div className="space-y-4">
          <NavLink to="/signup">
            <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Sign up now!
            </button>
          </NavLink>

          <NavLink to="/signin">
            <button className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700">
              Sign in
            </button>
          </NavLink>
        </div>
    </div>
  );
};

export default Home;
