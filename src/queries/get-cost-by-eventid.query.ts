// src/queries/getUserById.ts
import { Request, Response } from "express";
import { myDataSource } from "../database/app-data-source";
import { GastosEvento } from "../entities/gastoEvento.entity";
import { Evento } from "../entities/evento.entity";

export const getCostByEventId = async (req: Request, res: Response) => {
    const event = await myDataSource.getRepository(Evento).findOne({ where: { id_evento: Number.parseInt(req.params.id) } });
    const results = await myDataSource.getRepository(GastosEvento).find({
        where: {
            id_evento: {id_evento:event.id_evento}
        }
        
    });
    return res.send(results);
};