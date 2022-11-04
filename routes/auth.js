import { Router } from "express";
const router = Router();
import { AuthController as Auth } from "../controller";

// signup
router.post("/register", Auth.signUp);
router.post("/login", Auth.signIn);
router.get("/logout", Auth.logout);
router.get("/refreshuser", Auth.refreshAccess);

export default router;
