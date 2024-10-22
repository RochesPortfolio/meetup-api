// src/routes/queryRoutes.ts
import { Router } from "express";
import { getAllInvites, getAllUsers, getInviteInfo, getUserById } from "../controllers/query.controller";

const router = Router();

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.get("/invites", getAllInvites);
router.get("/invite/info/:hash_invite", getInviteInfo);


export default router;