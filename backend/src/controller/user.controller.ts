import { ObjectId } from "mongoose";
import { getUserByEmail, createUser, getUserById, removeRefreshToken } from "../services/service";
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

const getAccessAndRefreshToken = async(userId: string) => {
    const userToken = await getUserById(userId);
    if (!userToken) {
        throw new ApiError(404, "User not found");
    }
    const accessToken = userToken.generateAccessToken();
    const refreshToken = userToken.generateRefreshToken();

    userToken.refreshToken = refreshToken;
    await userToken.save({validateBeforeSave: false});
    return { accessToken, refreshToken };
};


const signIn_Controller = asyncHandler(async (req: Request, res: Response) => {
    const {email, password} = req.body;
    if (!email || !password) {
        throw new ApiError(400, "credentials are required");
    }
    const user = await getUserByEmail(email);
    if (!user || !(await user.isPasswordCorrect(password))) {
        throw new ApiError(401, "Invalid email or password");
    }
    const { accessToken, refreshToken } = await getAccessAndRefreshToken((user._id as ObjectId).toString());

    const userLogin = await getUserById((user._id as ObjectId).toString());

    const options = {
        httpOnly: true,
        secure: true
    }
    
    res.cookie("refreshToken", refreshToken, options).cookie("accessToken", accessToken, options)
    .status(200).json(new ApiResponse(200, {userLogin, accessToken, refreshToken}, "User signed in successfully"));
});

const getUserData = asyncHandler(async (req: Request, res: Response) => {
 const user = req.user;
    if (!user) {
        throw new ApiError(401, "User not authenticated");
    }

    res.status(200).json(new ApiResponse(200, user, "User data retrieved successfully"));
})

const loggout_Controller = asyncHandler(async (req: Request, res: Response) => {
    await removeRefreshToken(req.user?._id);
    res.clearCookie("refreshToken").clearCookie("accessToken").status(200).json(new ApiResponse(200, null, "User logged out successfully"));
})

export {signUp_Controller, signIn_Controller, getUserData, loggout_Controller};