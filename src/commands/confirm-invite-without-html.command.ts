import { Request, Response } from "express";
import loggerService from "../services/logger.service";
import { HttpStatus } from "../enums/http-code.enum";
import { getSingleInvite } from "../services/get-single-invite.service";
import { buildOkResponse } from "../dtos/base-response.dto";
import { updateInvite } from "../services/update-invite.service";
//const path = require('path');
//import { htmlConfirmInvite } from '../mail-templates/response-mail-templates/confirm-invite-thanks.template';


interface ConfirmInviteInteface {
    hash_invite: string;
}

export const confirmInviteWithoutHtml = async (req: Request, res: Response) => {
    try {
        const { hash_invite } = req.params as unknown as ConfirmInviteInteface;
        loggerService.info(`Getting single invite with hash: ${hash_invite}`);

        const getSingleInviteResult = await getSingleInvite(hash_invite);

        if (getSingleInviteResult.estado_invitacion === "Cancelada") {
            loggerService.info(`Invite with hash: ${hash_invite} is already canceled`);
            return res.status(HttpStatus.BAD_REQUEST).send(
                buildOkResponse(getSingleInviteResult, 'Invite is already canceled')
            );
        }
        // Modificar la invitación
        getSingleInviteResult.estado_invitacion = "Confirmada";
        getSingleInviteResult.fecha_confirmacion = new Date().toISOString().split('T')[0]; // Fecha actual en formato YYYY-MM-DD

        // Actualizar la invitación en la base de datos
        const updateInviteResult = await updateInvite(getSingleInviteResult);
        if (!updateInviteResult) {
            loggerService.error(`Error updating invite with hash: ${hash_invite}`);
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(updateInviteResult);
        }


        res.set('Content-Type', 'text/html');
        return res.status(HttpStatus.OK).send({code:200,status:'Success',message:'Se aceptó la invitación'});


    } catch (error) {
        loggerService.error(`[SendMailCommand] Error enviando correo(s): ${error}`);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Error enviando correo(s)', error });
    }
};