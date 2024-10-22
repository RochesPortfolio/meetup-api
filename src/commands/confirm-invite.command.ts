import { Request, Response } from "express";
import loggerService from "../services/logger.service";
import { HttpStatus } from "../enums/http-code.enum";
import { getSingleInvite } from "../services/get-single-invite.service";
import { log } from "console";
import { Invitacion } from "../entities/invitacion.entity";
import { buildOkResponse } from "../dtos/base-response.dto";
import { updateInvite } from "../services/update-invite.service";

interface ConfirmInviteInteface {
    hash_invite: string;
}

export const confirmInvite = async (req: Request, res: Response) => {
    try {
        const { hash_invite } = req.params as unknown as ConfirmInviteInteface;
        loggerService.info(`Getting single invite with hash: ${hash_invite}`);

        const getSingleInviteResult = await getSingleInvite(hash_invite);
         // Modificar la invitación
         getSingleInviteResult.estado_invitacion = "Confirmada";
         getSingleInviteResult.fecha_confirmacion = new Date().toISOString().split('T')[0]; // Fecha actual en formato YYYY-MM-DD
 
         // Actualizar la invitación en la base de datos
         const updateInviteResult = await updateInvite(getSingleInviteResult);
         if (!updateInviteResult) {
             return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(updateInviteResult);
         }
 
         loggerService.info(`Invite with hash: ${hash_invite} updated successfully`);
         return res.status(HttpStatus.OK).send(
            buildOkResponse(updateInviteResult, 'Invite updated successfully')
         );

    } catch (error) {
        loggerService.error(`[SendMailCommand] Error enviando correo(s): ${error}`);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Error enviando correo(s)', error });
    }
};