import { Router } from "express";
import {
    deleteSymptomLogByDate,
    fetchSymptomLogByDate,
    getDatesWithEntries,
    saveSymptomLog
}
    from "../controllers/symptomLog.controller.js";

const symptomLogRouter = Router();

// POST /api/v1/symptom-logs
symptomLogRouter
.post("/", saveSymptomLog);

// DELETE /api/v1/symptom-logs
symptomLogRouter
    .delete("/", deleteSymptomLogByDate);


symptomLogRouter
    .get("/by-date", fetchSymptomLogByDate)


symptomLogRouter
    .get("/dates", getDatesWithEntries)


export default symptomLogRouter;
