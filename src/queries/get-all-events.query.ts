import { Request, Response } from "express";
import loggerService from "../services/logger.service";
import { HttpStatus } from "../enums/http-code.enum";
import { buildErrorResponse, buildOkResponse } from "../dtos/base-response.dto";
import { GetAllEvents } from "../services/get-events.service";

export const GetAllEventsQuery = async (req: Request, res: Response) => {
    try {
        const result = await GetAllEvents();
        if (!result) {
            loggerService.error(`[GetAllEvents] Error getting Events by month and year`);
            return res.status(HttpStatus.NOT_FOUND).send(
                buildErrorResponse([], 'Not events found', HttpStatus.NOT_FOUND)
            );
        } else {
            return res.status(HttpStatus.OK).send(
                buildOkResponse(result, 'Events by month and year')
            );
        }
    } catch (error) {
        loggerService.error(`[getAllEvents] Error getting Events by month and year: ${error}`);
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(
            buildErrorResponse(undefined, 'Error getting Events by month and year', HttpStatus.INTERNAL_SERVER_ERROR)
        );
    }
};