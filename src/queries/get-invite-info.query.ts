import { Request, Response } from "express";
import loggerService from "../services/logger.service";
import { HttpStatus } from "../enums/http-code.enum";
import { getSingleInvite } from "../services/get-single-invite.service";

interface ConfirmInviteInteface {
    hash_invite: string;
}

export const getInviteInfo = async (req: Request, res: Response) => {
    try {
        const { hash_invite } = req.params as unknown as ConfirmInviteInteface;
        const invite = await getSingleInvite(hash_invite);
        if (invite.httpStatus === HttpStatus.NOT_FOUND) {
            return res.status(HttpStatus.NOT_FOUND).send(invite);
        } else {
            return res.status(HttpStatus.OK).send(invite);
        }
    } catch (error) {
        loggerService.error(`[SendMailCommand] Error enviando correo(s): ${error}`);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Error enviando correo(s)', error });
    }
};