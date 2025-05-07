import { SymptomLog } from "../models/symptomLog.model.js";
import { AppError } from "../utils/index.js";

export const saveSymptomLogService = async (userId, date, scores) => {
  try {
    if (!userId || !date || !Array.isArray(scores) || scores.length === 0) {
      throw new AppError(400, "User ID, date, and scores are required.");
    }

    const logDate = new Date(date);
    logDate.setUTCHours(0, 0, 0, 0); // normalize to midnight UTC

    const update = { scores };
    const options = {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true,
    };

    const symptomLog = await SymptomLog.findOneAndUpdate(
      { user: userId, date: logDate },
      update,
      options
    );

    return symptomLog;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(500, error?.message || "Failed to save symptom log.");
  }
};


export const getSymptomLogByUserAndDate = async (userId, dateISO) => {
  const selectedDate = new Date(dateISO);

  // Create start and end of that day (00:00:00 to 23:59:59)
  const startOfDay = new Date(selectedDate);
  startOfDay.setUTCHours(0, 0, 0, 0);

  const endOfDay = new Date(selectedDate);
  endOfDay.setUTCHours(23, 59, 59, 999);

  const log = await SymptomLog.findOne({
    user: userId,
    date: {
      $gte: startOfDay,
      $lte: endOfDay
    }
  });

  return log;

};

