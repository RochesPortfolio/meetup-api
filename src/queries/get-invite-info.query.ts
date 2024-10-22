import { Request, Response } from "express";
import loggerService from "../services/logger.service";
import { HttpStatus } from "../enums/http-code.enum";
import { getSingleInvite } from "../services/get-single-invite.service";
import { buildErrorResponse, buildOkResponse } from "../dtos/base-response.dto";

interface ConfirmInviteInteface {
    hash_invite: string;
}

export const getInviteInfo = async (req: Request, res: Response) => {
    try {
        const { hash_invite } = req.params as unknown as ConfirmInviteInteface;
        const invite = await getSingleInvite(hash_invite);
        if (!invite) {
            loggerService.info(`Invite with hash: ${hash_invite} not found`);
            return res.status(HttpStatus.NOT_FOUND).send(
                buildErrorResponse(undefined, 'Invite not found', HttpStatus.NOT_FOUND)
            );
        } else {
            return res.status(HttpStatus.OK).send(
                buildOkResponse(invite, 'Invite found')
            );
        }
    } catch (error) {
        loggerService.error(`[SendMailCommand] Error enviando correo(s): ${error}`);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(
            buildErrorResponse(undefined, 'Error getting invite info', HttpStatus.INTERNAL_SERVER_ERROR)
        );
    }
};