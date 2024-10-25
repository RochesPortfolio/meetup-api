// src/commands/createEventCommand.ts
import { Request, Response } from "express";
import { myDataSource } from "../database/app-data-source";
import { GastosEvento } from "../entities/gastoEvento.entity";
import loggerService from "../services/logger.service";
import { Evento } from "../entities/evento.entity";
import { buildOkResponse } from "../dtos/base-response.dto";
import { HttpStatus } from "../enums/http-code.enum";

export interface Cost {
    evento: number;
    total: number;
    descuento: number;
    estado: string;
    descripcion: string
}

export interface CostBodyProps{
    costos: Cost[]
}


export const costEvent = async (req: Request, res: Response) => {
    try {
        const getCostBody:CostBodyProps = req.body;
        const nuevosCostos = getCostBody.costos.map(async (costoData) => {
            const evento = await myDataSource.getRepository(Evento).findOne({ where: { id_evento: costoData.evento } });
            const newCost = new GastosEvento();
            newCost.id_evento = evento;
            newCost.total = costoData.total;
            newCost.descuento = costoData.descuento;
            newCost.estado_pago = costoData.estado;
            newCost.comentarios = costoData.descripcion;
            newCost.fecha_creacion = new Date();
            newCost.fecha_actualizacion = new Date();

            return newCost; 
        });

        const costosList = await Promise.all(nuevosCostos);
        await myDataSource.getRepository(GastosEvento).save(costosList);
        
        return  res.status(HttpStatus.OK).send(
            buildOkResponse(costosList, 'Costs Event created successfully' )
        );

    } catch (error) {
        loggerService.error(`[Insert Costs] Error en insertar costos: ${error}`);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Error en enviar costos', error });
    }
};