import { getUserByEmail, createUser } from "../services/service";
import ApiError from "../utils/ApiError";
import ApiResponse from "../utils/ApiResponse";
import asyncHandler from "../utils/asynsHandler";
import { Request, Response } from "express";

const signUp_Controller = asyncHandler(async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    if(!username || !email || !password) {
        throw new ApiError(400, "Username, email, and password are required");
    }

    const userExists = await getUserByEmail(email);

    if (userExists) {
        throw new ApiError(400, "User already exists");
    }

    const newUser = await createUser({ username, email, password });

    if (!newUser) {
        throw new ApiError(500, "Failed to create user");
    }

    res.status(200).json(new ApiResponse(200, newUser, "User signup controller is working"));
});


export {signUp_Controller};