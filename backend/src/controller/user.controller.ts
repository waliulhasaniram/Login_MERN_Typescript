import { ObjectId } from "mongoose";
import { getUserByEmail, createUser, getUserById, removeRefreshToken, FindOneUserAndUpdate } from "../services/service";
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

const userData_update = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user?._id;
    if (!userId) {
        throw new ApiError(401, "User not authenticated");
    }

    const { username, email } = req.body || {};
    if (!username || !email) {
        throw new ApiError(400, "Username and email are required");
    }

    const updatedUser = await FindOneUserAndUpdate(userId, { username, email });
    if (!updatedUser) {
        throw new ApiError(500, "Failed to update user data");
    }

    res.status(200).json(new ApiResponse(200, updatedUser, "User data updated successfully"));
})

const updatePassword_Controller = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?._id;
  if (!userId) {
    throw new ApiError(401, "User not authenticated");
  }

  const { oldPassword, newPassword } = req.body || {};

  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "Old and new passwords are required");
  }

  // 1. Get the user
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // 2. Check old password
  const isMatch = await user.isPasswordCorrect(oldPassword);
  if (!isMatch) {
    throw new ApiError(401, "Old password is incorrect");
  }

  // 3. Set new password and save (will trigger hashing hook)
  user.password = newPassword;
  await user.save(); // 🔐 Will hash password before saving

  res.status(200).json(new ApiResponse(200, null, "Password updated successfully"));
});


export {signUp_Controller, signIn_Controller, getUserData, loggout_Controller, userData_update, updatePassword_Controller};