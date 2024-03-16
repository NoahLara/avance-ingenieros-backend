import { Router } from "express";
import { authenticateUser } from "../controllers/auth.controllers";

const router = Router();

router.post("/auth/login", authenticateUser);

export default router;
