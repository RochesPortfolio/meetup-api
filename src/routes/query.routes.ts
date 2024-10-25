// src/routes/queryRoutes.ts
import { Router } from "express";
import { GetAllEventsQuery, GetEventoByMonthAndYearQuery, getAllInvites, getAllUsers, getEnterpricesWithPersons, getInviteInfo, getUserById } from "../controllers/query.controller";

const router = Router();

router.get("/users", getAllUsers);
router.get("/users/:id", getUserById);
router.get("/invites", getAllInvites);
router.get("/invite/info/:hash_invite", getInviteInfo);

router.get("/getEnterprisesWithPersons", getEnterpricesWithPersons);
router.get("/events/:month/:year", GetEventoByMonthAndYearQuery);
router.get("/events", GetAllEventsQuery);


export default router;