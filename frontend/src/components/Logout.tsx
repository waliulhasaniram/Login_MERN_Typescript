import { Navigate } from "react-router";
import { useAuth } from "../contextAPI/Store";

const Logout = () => {
  const auth = useAuth();
  auth.loggout()

  return <Navigate to="/signin"/>
  
};

export default Logout;
