// src/queries/getUserById.ts
import { Request, Response } from "express";
import { myDataSource } from "../database/app-data-source";
import { User } from "../entities/user.entity";

export const getUserById = async (req: Request, res: Response) => {
    const results = await myDataSource.getRepository(User).findOneBy({
        id: Number.parseInt(req.params.id),
    });
    return res.send(results);
};