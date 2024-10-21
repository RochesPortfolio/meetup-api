// src/routes/queryRoutes.ts
import { Router } from "express";
import { getAllUsers, getUserById } from "../controllers/query.controller";
import { getAllInvites } from "../queries/get-all-guest.query";

const router = Router();

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);

router.get("/invites", getAllInvites);
export default router;