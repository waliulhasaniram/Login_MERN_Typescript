import { createContext, useContext, useState } from "react";
import Cookies from "js-cookie"
import type { ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";

interface AuthContextType {
  accessToken: string | null;
  loggedInUser?: any; // Adjust type as needed
  isLoggedIn: boolean;
  loading?: boolean;
  authorizationToken?: string;
  storeAccessToken: (storeToken: string) => void;
  getUserData: () => Promise<void>;
  loggout: () => Promise<any>;
}
const authContext = createContext<AuthContextType>({
  accessToken: null,
  loggedInUser: undefined,
  isLoggedIn: false,
  storeAccessToken: () => {},
  getUserData: async () => { console.warn("getUserData function not implemented") },
  loggout: async () => { console.warn("loggout function not implemented") }
});


export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const api_link = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

    const [loading, setLoading] = useState(true)
    const [accessToken, setAccessToken] = useState<string | null>(Cookies.get("accessToken") ?? null)

    const [loggedInUser, setLoggedInUser] = useState()
    const authorizationToken = `Bearer ${accessToken}`
    const isLoggedIn = !!accessToken

    const storeAccessToken =(storeToken: string)=> {
        setAccessToken(storeToken)
        return Cookies.set("accessToken", storeToken)
    }

    const getUserData = async (): Promise<any> => {
        const response = await fetch(`${api_link}/user`, {
            method: "GET",
            headers: {
                Authorization: authorizationToken
            },
            //credentials: "include", // important for sending cookies
        });

        if(response.ok){
            const res_user = await response.json()
            //console.log(res_user.data)
            setLoggedInUser(res_user.data)
            setLoading(false)
        }

        return response.json();
    };
    const getLoggedInUserData = useQuery({
            queryKey: ["loggedInUser"],
            queryFn: getUserData,
            staleTime: 1000 * 60 * 5, // optional: 5 minutes
            retry: 1,
            refetchOnWindowFocus: false,
    });

     const loggout =async(): Promise<any>=>{
        const response = await fetch(`${api_link}/logout`, {
            method: "POST",
            headers: {
                Authorization: authorizationToken
            }
        })
        if(response.ok){
            setAccessToken("")
            Cookies.remove("accessToken")
        }
    }
        const logoutTheUser = useQuery({
            queryKey: ["loggout"],
            queryFn: getUserData,
            staleTime: 1000 * 60 * 5, // optional: 5 minutes
            retry: 1,
            refetchOnWindowFocus: false,
    });


  return <authContext.Provider value={{storeAccessToken, getUserData, loggout, accessToken, loggedInUser, isLoggedIn, loading, authorizationToken}}>{children}</authContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}