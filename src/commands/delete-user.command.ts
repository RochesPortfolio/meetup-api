// src/commands/deleteUser.ts
import { Request, Response } from "express";
import { myDataSource } from "../database/app-data-source";
import { User } from "../entities/user.entity";

export const deleteUser = async (req: Request, res: Response) => {
    const results = await myDataSource.getRepository(User).delete(req.params.id);
    return res.send(results);
};