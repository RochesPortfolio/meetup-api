import { Request, Response } from "express";
import loggerService from "../services/logger.service";
import { HttpStatus } from "../enums/http-code.enum";
import { getSingleInvite } from "../services/get-single-invite.service";
import { updateInvite } from "../services/update-invite.service";
//import { htmlDeclineInvite } from "../mail-templates/response-mail-templates/decline-invite-thanks.template";

interface DeclineInviteInterface {
    hash_invite: string;
}

export const declineInviteWithoutHtml = async (req: Request, res: Response) => {
    try {
        const { hash_invite } = req.params as unknown as DeclineInviteInterface;
        loggerService.info(`Getting single invite with hash: ${hash_invite}`);

        const getSingleInviteResult = await getSingleInvite(hash_invite);

        // Modificar la invitación
        getSingleInviteResult.estado_invitacion = "Declinada";
        getSingleInviteResult.fecha_confirmacion = null; 

        // Actualizar la invitación en la base de datos
        const updateInviteResult = await updateInvite(getSingleInviteResult);
        if (!updateInviteResult) {
            loggerService.error(`Error updating invite with hash: ${hash_invite}`);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(updateInviteResult);
        }

        loggerService.info(`Invite with hash: ${hash_invite} updated successfully`);
    
        res.set('Content-Type', 'text/html');
        return res.status(HttpStatus.OK).send({code:200,status:'Success',message:'Se descartó la invitación'});
    } catch (error) {
        loggerService.error(`[SendMailCommand] Error enviando correo(s): ${error}`);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Error enviando correo(s)', error });
    }
};