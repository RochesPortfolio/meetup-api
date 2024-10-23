import { HttpStatus } from "../enums/http-code.enum";

export interface BaseResponseDto {
    success: boolean;
    message: string;
    data: any;
    httpStatus: HttpStatus;

}

export function buildOkResponse(data: any, message: string): BaseResponseDto {
    const response: BaseResponseDto = {
        data: data,
        success: true,
        message: message,
        httpStatus: HttpStatus.OK,
    }
    return response;
}
export function buildErrorResponse(data: any, message: string, httpStatus: HttpStatus): BaseResponseDto {
    const response: BaseResponseDto = {
        data: {...data},
        success: false,
        message: message,
        httpStatus: httpStatus,
    }
    return response;
}