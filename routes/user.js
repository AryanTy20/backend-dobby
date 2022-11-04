import { Router } from "express";
const router = Router();
import { UserController as UC } from "../controller";
import { verifyToken } from "../middleware/verifyToken";

// signup
router.post("/upload", verifyToken, UC.upload);
router.get("/search", verifyToken, UC.search);
router.get("/", verifyToken, UC.getImg);

export default router;
