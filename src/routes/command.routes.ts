// src/routes/commandRoutes.ts
import { Router } from "express";
import { createUser, updateUser, deleteUser, sendMailCommand, confirmInvite } from "../controllers/command.controller";

const router = Router();

router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.post('/invite/sendInvite', sendMailCommand);

// invite management
router.post('/invite/confirm/:hash_invite', confirmInvite);
router.post('/invite/decline/:hash_invite', sendMailCommand);

export default router;