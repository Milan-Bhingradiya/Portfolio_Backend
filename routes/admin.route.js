import { Router } from "express";
import { adminlogin } from "../controllers/auth/auth.controller.js";
export const authrouter=Router();

authrouter.route("/login").post(adminlogin);

 export default authrouter;