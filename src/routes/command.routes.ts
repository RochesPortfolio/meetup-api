// src/routes/commandRoutes.ts
import { Router } from "express";
import { createUser, updateUser, deleteUser, sendMailCommand, confirmInvite , declineInvite, createEventCommand,costEvent,confirmInviteWithoutHtml,declineInviteWithoutHtml} from "../controllers/command.controller";


const router = Router();

router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);
router.post('/invite/sendInvite', sendMailCommand);
router.post('/cost', costEvent);
// invite management
router.get('/invite/confirm/:hash_invite', confirmInvite);
router.get('/invite/decline/:hash_invite', declineInvite);
router.post('/events/create',createEventCommand);
router.get('/invite/confirmwh/:hash_invite', confirmInviteWithoutHtml);
router.get('/invite/declinewh/:hash_invite', declineInviteWithoutHtml);

export default router;