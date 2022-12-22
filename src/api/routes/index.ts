import { Router } from "express";

import userRoutes from "@routes/usersRoutes";
import authRoutes from "@routes/authRoutes";

const router = Router();

router.use("/api/users", userRoutes);
router.use("/auth", authRoutes);

export default router;
