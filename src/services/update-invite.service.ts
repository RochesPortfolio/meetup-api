import { Invitacion } from '../entities/invitacion.entity';
import { myDataSource } from '../database/app-data-source';
import loggerService from './logger.service';

export const updateInvite = async (invite: Invitacion) : Promise<Invitacion> => {
    const inviteRepository = myDataSource.getRepository(Invitacion);
    try {
        return await inviteRepository.save(invite);
    } catch (error) {
        loggerService.error(`Error updating invite: ${error}`);
        throw new Error('Error updating invite' + error);
    }
};