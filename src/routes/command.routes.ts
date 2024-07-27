// src/routes/commandRoutes.ts
import { Router } from "express";
import { createUser, updateUser, deleteUser } from "../controllers/command.controller";

const router = Router();

router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;