// src/commands/createEventCommand.ts
import { Request, Response } from "express";
import { myDataSource } from "../database/app-data-source";
import { Evento,EventoEstado } from "../entities/evento.entity";
import { v4 as uuidv4 } from 'uuid';
import loggerService from "../services/logger.service";
import { buildErrorResponse, buildOkResponse } from "../dtos/base-response.dto";
import { HttpStatus } from "../enums/http-code.enum";

export interface EventBodyProps {
    nombre_evento: string;
    lugar_evento: string;
    aforo_evento: number;
    tipo_evento: string;
    descripcion: string
    rubro_negocio: string;
    hora_inicio: string;
    hora_culminacion: string;
    fecha_inicio: string;
    fecha_finalizacion: string;
}

export const createEventCommand = async (req: Request, res: Response)=> {
    const {
        nombre_evento,
        lugar_evento,
        aforo_evento,
        tipo_evento,
        descripcion,
        rubro_negocio,
        hora_inicio,
        hora_culminacion,
        fecha_inicio,
        fecha_finalizacion
    } = req.body as unknown as EventBodyProps;

    const NewEvent = myDataSource.getRepository(Evento).create();
    NewEvent.hash_evento = uuidv4();
    NewEvent.nombre_evento = nombre_evento;
    NewEvent.lugar_evento = lugar_evento;
    NewEvent.aforo_evento = aforo_evento;
    NewEvent.tipo_evento = tipo_evento;
    NewEvent.descripcion = descripcion;
    NewEvent.rubro_negocio = rubro_negocio;
    NewEvent.hora_inicio = hora_inicio;
    NewEvent.hora_culminacion = hora_culminacion;
    NewEvent.fecha_inicio = fecha_inicio;
    NewEvent.fecha_finalizacion = fecha_finalizacion;
    NewEvent.status = EventoEstado.PLANIFICADOS;

    loggerService.info(`Creating new event: ${NewEvent.nombre_evento}`);
    try {
        await myDataSource.getRepository(Evento).save(NewEvent);
        loggerService.info(`Event ${NewEvent.nombre_evento} created successfully`);
        return  res.status(HttpStatus.OK).send(
            buildOkResponse(NewEvent, 'Event created successfully' )
        );
    } catch (error) {
        loggerService.error(`Error creating event ${NewEvent.nombre_evento}: ${error}`);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(
            buildErrorResponse(error,'Error creating event', HttpStatus.INTERNAL_SERVER_ERROR)
        );
    }
};

