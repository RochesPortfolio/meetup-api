import { Request, Response } from "express";
import { myDataSource } from "../database/app-data-source";
import { Invitacion } from "../entities/invitacion.entity";
import loggerService from "./logger.service";
import { BaseResponseDto, buildErrorResponse, buildOkResponse } from "../dtos/base-response.dto";
import { HttpStatus } from "../enums/http-code.enum";

export const getSingleInvite = async (hash_invite :string) : Promise<BaseResponseDto> => {
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
            return buildErrorResponse(undefined, 'Error getting invite', HttpStatus.NOT_FOUND);
        }
        return buildOkResponse(found, 'Invite found');
    } catch (error) {
       loggerService.error(error);
       return buildErrorResponse(undefined, 'Error getting invite', HttpStatus.NOT_FOUND);
    }
};