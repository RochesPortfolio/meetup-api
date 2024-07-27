// src/queries/getAllUsers.ts
import { Request, Response } from "express";
import { myDataSource } from "../database/app-data-source";
import { User } from "../entities/user.entity";

export const getAllUsers = async (req: Request, res: Response) => {
    const users = await myDataSource.getRepository(User).find();
    res.json(users);
};