import loggerService from './logger.service';
import { myDataSource } from '../database/app-data-source';
import { Evento } from '../entities/evento.entity';
import { Between } from 'typeorm';
const thisFunctionName = 'GetEventoByMonthAndYear';

interface GetEventoByMonthAndYearInterface {
    month: number;
    year: number;
}


const getFirstAndLastDayOfMonth = (year: number, month: number) => {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    return { firstDay, lastDay };
};


export const GetEventoByMonthAndYear = async (props: GetEventoByMonthAndYearInterface): Promise<Evento[]> => {
    loggerService.info(`[${thisFunctionName}] Obteniendo eventos por mes y año: ${JSON.stringify(props)}`);
    const eventoRepository = myDataSource.getRepository(Evento);
    const { month, year } = props;
    try {
        const { firstDay, lastDay } = getFirstAndLastDayOfMonth(year, month);
        loggerService.info(`[${thisFunctionName}] Obteniendo eventos entre ${firstDay.toISOString().split('T')[0]} y ${lastDay.toISOString().split('T')[0]}`);
        const Eventos = await eventoRepository.find({
            where: {
                fecha_inicio: Between(firstDay.toISOString().split('T')[0], lastDay.toISOString().split('T')[0])
            },
            order: {
                hora_inicio: 'ASC'
            }
        });

        if (!Eventos.length || !Eventos) {
            return undefined;
        }

        return Eventos;
    } catch (error) {
        loggerService.error(`Error obteniendo Eventos entre fechas:`, error);
        throw new Error(`Error obteniendo Eventos entre fechas: ${error}`);
    }
}