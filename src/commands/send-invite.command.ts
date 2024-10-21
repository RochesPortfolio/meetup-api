import { Request, Response } from "express";
import { SendMailProps, SendMailService } from "../services/send-mail.service";
import loggerService from "../services/logger.service";
import { HttpStatus } from "../enums/http-code.enum";

export const sendMailCommand = async (req: Request, res: Response) => {
    const emails: SendMailProps | SendMailProps[] = req.body;
    try {
        const result = await SendMailService(emails);
        console.info(result);
        return res.status(HttpStatus.OK).send(result);
    } catch (error) {
        loggerService.error(`[SendMailCommand] Error enviando correo(s): ${error}`);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Error enviando correo(s)', error });
    }
};