import { Request, Response } from "express";
import loggerService from "../services/logger.service";
import { HttpStatus } from "../enums/http-code.enum";
//import { getSingleInvite } from "../services/get-single-invite.service";
//import { buildOkResponse } from "../dtos/base-response.dto";
//import { updateInvite } from "../services/update-invite.service";

import axios from 'axios';

export const getTokenDashboard = async (req: Request, res: Response) => {
    try {
        const tableauServerUrl = "https://us-east-1.online.tableau.com";
        const siteId = "cjazurdia-2ef28b40b7";
        const personalAccessTokenName = "MeetUpAuth";
        const personalAccessTokenSecret = "v/JMUD7vQzuWnv4TFA7AiQ==:ka32o5K6KbkR3lAnrqnGZVreaEBHSXW4";

        // Solicitud a la API de Tableau para autenticación
        const response = await axios.post(`${tableauServerUrl}/api/3.12/auth/signin`, {
        credentials: {
            personalAccessTokenName,
            personalAccessTokenSecret,
            site: {
                contentUrl: siteId,
            },
            },
        });
        
        console.log(response.data);
        // Enviar de vuelta el token al frontend
        res.json(response.data);
    } catch (error) {
        loggerService.error(`[SendMailCommand] Error enviando correo(s): ${error}`);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ message: 'Error enviando correo(s)', error });
    }
};