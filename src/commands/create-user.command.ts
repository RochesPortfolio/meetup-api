// src/commands/createUser.ts
import { Request, Response } from "express";
import { myDataSource } from "../database/app-data-source";
import { User } from "../entities/user.entity";

export const createUser = async (req: Request, res: Response):Promise<Response<any, Record<string, any>>>=> {
    const user = myDataSource.getRepository(User).create(req.body);
    const results = await myDataSource.getRepository(User).save(user);
    return res.send(results);
};

