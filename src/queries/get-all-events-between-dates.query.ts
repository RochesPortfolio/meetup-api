import { Request, Response } from "express";
import loggerService from "../services/logger.service";
import { HttpStatus } from "../enums/http-code.enum";
import { buildErrorResponse, buildOkResponse } from "../dtos/base-response.dto";
import { GetEventoByMonthAndYear } from "../services/get-events-between-dates.service";

interface GetEventoByMonthAndYearQueryInterface {
    month: number;
    year: number;
}

export const GetEventoByMonthAndYearQuery = async (req: Request, res: Response) => {
    try {
        const { month, year } = req.params as unknown as GetEventoByMonthAndYearQueryInterface;
        const result = await GetEventoByMonthAndYear({
            month,
            year
        });
        if (!result) {
            loggerService.error(`[GetEventoByMonthAndYearQuery] Error getting Events by month and year`);
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