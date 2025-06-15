import { User } from "../models/user.models";

const getUserById = async (userId: string) => {
    return await User.findById(userId).select("-password -refreshToken");
}

const getUserByEmail = async (email: string) => {
    return await User.findOne({ email }).select("-password -refreshToken");
}

const createUser = async (userData: { username: string; email: string; password: string }) => {
    const user = new User(userData);
    return await user.save();
}

export { getUserById, getUserByEmail, createUser };