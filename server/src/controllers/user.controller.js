import { getUserProfileService } from "../services/user.service.js";
import { handleError } from "../utils/index.js";



export const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await getUserProfileService(userId);

        res.status(200).json({
            success: true,
            message: "User profile fetched successfully.",
            user,
        });

    } catch (error) {
        handleError(res, error, error.statusCode || 500, error.message);
    }
};
