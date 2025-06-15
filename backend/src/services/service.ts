import { User } from "../models/user.models";

const getUserById = async (userId: string) => {
    return await User.findById(userId);
}

const getUserByEmail = async (email: string) => {
    return await User.findOne({ email });
}

const createUser = async (userData: { username: string; email: string; password: string }) => {
    const user = new User(userData);
    return await user.save();
}

const removeRefreshToken = async (_id: string) => {
    // Use $set: {refreshToken: null} instead of $unset
    return await User.findByIdAndUpdate(
        _id,
        { $set: { refreshToken: null } },
        { new: true }  // Return the updated document
    );
}

export { getUserById, getUserByEmail, createUser, removeRefreshToken };