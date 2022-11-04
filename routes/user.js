import { Router } from "express";
const router = Router();
import { UserController as UC } from "../controller";
import { verifyToken } from "../middleware/verifyToken";

router.post("/upload", verifyToken, UC.upload);
router.get("/search", verifyToken, UC.search);
router.get("/images", verifyToken, UC.getImg);

export default router;
