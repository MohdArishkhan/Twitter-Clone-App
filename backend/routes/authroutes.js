import express from "express";
import { login, logout, signup ,getMe} from "../controllers/authcontrollers.js";
import { protectRoute } from "../middleware/protectRoute.js";
const router =express.Router();
/// video me post hai 

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.get("/me",protectRoute,getMe);
export default router

