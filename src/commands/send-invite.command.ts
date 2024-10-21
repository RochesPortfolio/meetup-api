import { Request, Response } from "express";
import { SendMailProps, SendMailService } from "../services/send-mail.service";
import loggerService from "../services/logger.service";
import { HttpStatus } from "../enums/http-code.enum";
/**
 * @swagger
 * /send-mail:
 *   post:
 *     summary: Enviar uno o varios correos electrónicos
 *     tags: [Correo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emails:
 *                 oneOf:
 *                   - $ref: '#/components/schemas/SendMailProps'
 *                   - type: array
 *                     items:
 *                       $ref: '#/components/schemas/SendMailProps'
 *     responses:
 *       200:
 *         description: Correo(s) enviado(s) exitosamente
 *       500:
 *         description: Error enviando correo(s)
 */
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