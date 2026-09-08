import { Router } from "express";
import { router as v1Routes } from "./v1/index.js";
<<<<<<< HEAD
=======
import { router as v2Routes } from "./v2/index.js";
>>>>>>> phase-3

export const router = Router();

router.use("/v1", v1Routes);
<<<<<<< HEAD
=======
router.use("/v2", v2Routes);
>>>>>>> phase-3
