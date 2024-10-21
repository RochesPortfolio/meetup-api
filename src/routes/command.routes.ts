// src/routes/commandRoutes.ts
import { Router } from "express";
import { createUser, updateUser, deleteUser, sendMailCommand } from "../controllers/command.controller";

const router = Router();

router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.post('/invite/sendInvite', sendMailCommand);

export default router;