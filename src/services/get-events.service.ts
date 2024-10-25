import loggerService from './logger.service';
import { myDataSource } from '../database/app-data-source';
import { Evento } from '../entities/evento.entity';
import { Between } from 'typeorm';
const thisFunctionName = 'GetAllEvents';



export const GetAllEvents = async (): Promise<Evento[]> => {
    loggerService.info(`[${thisFunctionName}] Obteniendo todos los eventos`);
    const eventoRepository = myDataSource.getRepository(Evento);
    try {
        loggerService.info(`[${thisFunctionName}] Obteniendo todos lo eventos`);
        const Eventos = await eventoRepository.find();

        if (!Eventos.length || !Eventos) {
            return undefined;
        }

        return Eventos;
    } catch (error) {
        loggerService.error(`Error obteniendo Eventos entre fechas:`, error);
        throw new Error(`Error obteniendo Eventos entre fechas: ${error}`);
    }
}