import { Router } from "express";
import { router as userRouter } from "./users.routes.js";
import { router as userSupabaseRouter } from "./users.supabase.routes.js";

export const router = Router();

router.use("/users", userSupabaseRouter);
router.use("/users", userRouter);