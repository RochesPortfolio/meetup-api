import { myDataSource } from '../database/app-data-source';
import { Evento } from '../entities/evento.entity';
import { EventoEstado } from '../entities/evento.entity';
import loggerService from '../services/logger.service';
import cron = require('node-cron');

const checkEventStatus = async () => {
    const eventoRepository = myDataSource.getRepository(Evento);
    const now = new Date();
    loggerService.info('⏰ CRON: Checking events status...');

    try {
        const eventos = await eventoRepository.find();
        eventos.forEach(async (evento) => {
            const fechaFin = new Date(evento.fecha_finalizacion);
            const horaFin = evento.hora_culminacion ? evento.hora_culminacion.split(':') : ['00', '00'];
            fechaFin.setHours(parseInt(horaFin[0]), parseInt(horaFin[1]));

            if (evento.status === EventoEstado.PLANIFICADOS) {
                // No hacer nada si el evento está planificado
                return;
            }

            if (fechaFin < now && evento.status !== EventoEstado.FINALIZADO) {
                evento.status = EventoEstado.FINALIZADO;
                await eventoRepository.save(evento);
                loggerService.info(`Evento ${evento.nombre_evento} finalizado.`);
            } else if (fechaFin >= now && evento.status !== EventoEstado.EN_CURSO) {
                evento.status = EventoEstado.EN_CURSO;
                await eventoRepository.save(evento);
                loggerService.info(`Evento ${evento.nombre_evento} en curso.`);
            }
        });
    } catch (error) {
        loggerService.error('Error revisando el estado de los eventos:', error);
    }
};


cron.schedule('*/30 * * * *', checkEventStatus);

loggerService.info('Cron job programado para revisar el estado de los eventos cada 30 segundos.');