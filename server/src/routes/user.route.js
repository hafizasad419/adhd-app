import { Router } from "express";
import { getUserProfile } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/profile/:userId").get(getUserProfile)

export default userRouter;                    
