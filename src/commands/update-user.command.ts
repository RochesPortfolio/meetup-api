// src/commands/updateUser.ts
import { Request, Response } from "express";
import { myDataSource } from "../database/app-data-source";
import { User } from "../entities/user.entity";

export const updateUser = async (req: Request, res: Response) => {
    const user = await myDataSource.getRepository(User).findOneBy({
        id: Number.parseInt(req.params.id),
    });
    myDataSource.getRepository(User).merge(user, req.body);
    const results = await myDataSource.getRepository(User).save(user);
    return res.send(results);
};