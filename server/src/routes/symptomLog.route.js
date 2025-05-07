import { Router } from "express";
import { fetchSymptomLogByDate, saveSymptomLog } from "../controllers/symptomLog.controller.js";

const symptomLogRouter = Router();

// POST /api/v1/symptom-logs
symptomLogRouter
    .post("/", saveSymptomLog);


symptomLogRouter
    .get("/by-date", fetchSymptomLogByDate)


export default symptomLogRouter;
