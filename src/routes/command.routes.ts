// src/routes/commandRoutes.ts
import { Router } from "express";
import { createUser, updateUser, deleteUser, sendMailCommand, confirmInvite , declineInvite, createEventCommand,costEvent} from "../controllers/command.controller";

const router = Router();

router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.post('/invite/sendInvite', sendMailCommand);
router.post('/cost', costEvent);
// invite management
router.post('/invite/confirm/:hash_invite', confirmInvite);
router.post('/invite/decline/:hash_invite', declineInvite);
router.post('/events/create',createEventCommand)

export default router;