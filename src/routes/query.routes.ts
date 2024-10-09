// src/routes/queryRoutes.ts
import { Router } from "express";
import { getAllUsers, getUserById } from "../controllers/query.controller";
import { getAllGuest } from "../queries/get-all-guest.query";

const router = Router();

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);

router.get("/guest", getAllGuest);
export default router;