import { Router } from "express";
const router = Router();
import { UserController as UC } from "../controller";

// signup
router.post("/upload", UC.upload);
router.get("/search", UC.search);
router.get("/", UC.getImg);

export default router;
