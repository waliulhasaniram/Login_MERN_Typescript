import React, { use } from "react";
import Input from "./common/Input";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../contextAPI/Store";

const PasswordUpdate = () => {

    const location = useLocation();
    const navigate = useNavigate();

    const api_link = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL;

    const auth = useAuth();
    const authorizationToken = auth.authorizationToken;

    const [data, setData] = useState({
        oldPassword: "",
        newPassword: "",
    });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const updatePasswordMutation = useMutation({
        mutationFn: async ({
            data,
            authorizationToken,
            api_link,
        }: {
            data: any;
            authorizationToken?: string;
            api_link: string;
        }) => {
            const headers: HeadersInit = {
                "Content-Type": "application/json",
            };
            if (authorizationToken) {
                headers["Authorization"] = authorizationToken;
            }
            const response = await fetch(`${api_link}/update_password/${location.state._id}`, {
                method: "PUT",
                headers,
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        },
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        updatePasswordMutation.mutate(
            {
                data,
                authorizationToken,
                api_link,
            },
            {
                onSuccess: (data) => {
                    console.log("Password updated successfully", data);
                    alert("Password updated successfully");
                },
                onError: (error) => {
                    console.error("Error updating password:", error);
                    alert("Error updating password");
                },
            }
        );
        navigate("/signin");
    }

    return <>
    <div className="flex flex-col items-center justify-center min-h-screen min-w-3xl bg-gray-900 text-gray-100">
    <h1 className="text-3xl font-bold mb-6">Update your password</h1>
    <form onSubmit={handleSubmit}>
      <h2>username: {location.state.username}</h2>
      <h2 className="pb-5">email: {location.state.email}</h2>
      <Input
        label="old_Password"
        type="password"
        name="oldPassword"
        value={data.oldPassword}
        onChange={handleChange}
        placeholder="oldPassword"
      />
      <Input
        label="new Password"
        type="password"
        name="newPassword"
        value={data.newPassword}
        onChange={handleChange}
        placeholder="newPassword"
      />
      <button type="submit" className="text-red-500">Update password</button>   
    </form>
    </div>
    </>
}

export default PasswordUpdate;