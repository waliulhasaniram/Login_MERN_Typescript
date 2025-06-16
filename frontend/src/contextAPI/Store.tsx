import { createContext, useContext } from "react";

const authContext = createContext({});

import type { ReactNode } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {


	return <authContext.Provider value={{}}>{children}</authContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}