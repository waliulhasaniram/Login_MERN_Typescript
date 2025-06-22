import { NavLink } from "react-router";
import { useAuth } from "../contextAPI/Store";

const Home = () => {
 const {isLoggedIn, loggedInUser, loading} = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100">
    <h1 className="text-3xl font-bold mb-6">Welcome to the Home</h1>

    <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-6">
      {isLoggedIn ? (
        loading ? <><h1>Loading...</h1></>:<>
                <div className="space-y-4">
                  <p className="text-lg font-medium">Username: {loggedInUser.username}</p>
                  <p className="text-lg font-medium">Email: {loggedInUser.email}</p>
                <NavLink to="/logout">
                  <button className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700">
                    Logout
                  </button>
                </NavLink>
                <NavLink to={`/update_data/${loggedInUser._id}`} state={ loggedInUser }>
                  <button className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700">
                    update data
                  </button>
                </NavLink>
        </div>
        </>

      ) : (
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
      )}
    </div>
  </div>
  );
};

export default Home;