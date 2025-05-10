import { updateReminderService, savePushSubscriptionService } from "../services/notification.service.js";
import { AppError, handleError } from "../utils/index.js";

export const updateReminder = async (req, res) => {
  try {
    const { type, enabled, userId } = req.body;

    if (!userId) throw new AppError(401, "Unauthorized.");
    if (!type || typeof enabled !== "boolean") {
      throw new AppError(400, "Type and enabled are required.");
    }

    const updatedPreferences = await updateReminderService(userId, type, enabled);

    res.status(200).json({
      success: true,
      message: `${type} reminder updated.`,
      data: updatedPreferences,
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const savePushSubscription = async (req, res) => {
  try {
    const { userId, subscription } = req.body;

    if (!userId || !subscription) throw new AppError(400, "Invalid subscription data.");

    await savePushSubscriptionService(userId, subscription);

    res.status(200).json({ success: true, message: "Push subscription saved." });
  } catch (err) {
    handleError(res, err);
  }
};
