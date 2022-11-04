import { Router } from "express";
const router = Router();
import { AuthController as Auth } from "../controller";
import { verifyToken } from "../middleware/verifyToken";
// signup
router.post("/register", Auth.signUp);
router.post("/login", Auth.signIn);
router.get("/logout", verifyToken, Auth.logout);
router.get("/refreshuser", verifyToken, Auth.refreshAccess);

export default router;
