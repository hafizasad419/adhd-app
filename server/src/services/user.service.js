import { User } from "../models/user.model.js";
import { AppError } from "../utils/index.js";



export const getAllUsersService = async () => {

    // wrap in try catch
    return await User.find();
};


export const getUserProfileService = async (userId) => {
    try {
        const user = await User.findById(userId)
            .select("name email organization")

        if (!user) {
            throw new AppError(404, "User not found.");
        }

        return user;
    } catch (error) {
        throw new AppError(500, error.message || "Failed to fetch user profile.");
    }
};
