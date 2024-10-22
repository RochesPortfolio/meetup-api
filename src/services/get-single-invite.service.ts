import { myDataSource } from "../database/app-data-source";
import { Invitacion } from "../entities/invitacion.entity";
import loggerService from "./logger.service";

export const getSingleInvite = async (hash_invite :string) : Promise<Invitacion> => {
    try {
        loggerService.info(`Getting single invite with hash: ${hash_invite}`);
        const invitations = myDataSource.getRepository(Invitacion);
        const found = await invitations.findOne    (
            {
                where: {
                    hash_invite: hash_invite
                }
            }
        );

        if (!found) {
            loggerService.info(`Invite with hash: ${hash_invite} not found`);
            return undefined;
        }
        return found;
    } catch (error) {
       loggerService.error(error);
       return undefined;
    }
};