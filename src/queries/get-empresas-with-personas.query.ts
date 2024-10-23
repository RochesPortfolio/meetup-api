import { Request, Response } from "express";
import loggerService from "../services/logger.service";
import { HttpStatus } from "../enums/http-code.enum";
import { getEmpresaWithPersonas } from "../services/get-empresa-with-personas.service";
import { buildErrorResponse, buildOkResponse } from "../dtos/base-response.dto";

// interface ConfirmInviteInteface {
//     hash_invite: string;
// }

export const getEnterpricesWithPersons = async (req: Request, res: Response) => {
    try {
        // const { hash_invite } = req.params as unknown as ConfirmInviteInteface;
        const result = await getEmpresaWithPersonas();
        if (!result) {
            loggerService.info(`There are no Enterprises with Persons`);
            return res.status(HttpStatus.NOT_FOUND).send(
                buildErrorResponse(undefined, 'Not enterprises found.', HttpStatus.NOT_FOUND)
            );
        } else {
            return res.status(HttpStatus.OK).send(
                buildOkResponse(result, 'Enterprises found')
            );
        }
    } catch (error) {
        loggerService.error(`[getInviteInfo] Error getting Enterprises: ${error}`);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(
            buildErrorResponse(undefined, 'Error getting Enterprises', HttpStatus.INTERNAL_SERVER_ERROR)
        );
    }
};