import { createTransport, Transporter } from 'nodemailer';
import { google } from 'googleapis';
import { config } from '../config/local';
import loggerService from './logger.service';
import { buildMailBody } from '../mail-templates/html-mail-body.builder';
import { MailTemplateType } from '../mail-templates/interfaces/mail-template.type';
import { buildOkResponse, BaseResponseDto } from '../dtos/base-response.dto';
const thisFunctionName = 'SendMailService';

export interface SendMailProps {
    from: string;
    to: string;
    subject: string;
    mailTemplateType?: MailTemplateType;
}

// Inicialización del cliente OAuth2
const oauth2Client = new google.auth.OAuth2(
    config.mailing.auth.clientId,
    config.mailing.auth.clientSecret,
    "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
    refresh_token: config.mailing.auth.refreshToken,
});

// Función para crear el transportador usando OAuth2
const createTransporter = async (): Promise<Transporter> => {
    try {
        const { token } = await oauth2Client.getAccessToken();
        return createTransport({
            service: config.mailing.service,
            auth: {
                type: 'OAuth2',
                user: config.mailing.auth.user,
                clientId: config.mailing.auth.clientId,
                clientSecret: config.mailing.auth.clientSecret,
                refreshToken: config.mailing.auth.refreshToken,
                accessToken: token || ''
            }
        });
    } catch (error) {
        loggerService.error(`Error obteniendo el token de acceso OAuth2:`, error);
        throw new Error(`No se pudo obtener el token de acceso.`);
    }
};


const sendEmail = async (props: SendMailProps): Promise<BaseResponseDto> => {

    const { from, to, subject, mailTemplateType } = props;

    const html = buildMailBody(mailTemplateType);

    try {
        const transporter = await createTransporter();
        const mailOptions = { from, to, subject, html };

        loggerService.info(`Enviando correo a:`, to);
        const info = await transporter.sendMail(mailOptions);
        loggerService.info(`Correo enviado: ${info.response}`);
        // TODO: guardar el correo en la base de datos
        return buildOkResponse(info.response, `Correo enviado correctamente.`);
    } catch (error) {
        loggerService.error(`Error enviando correo:`, error);
        throw new Error(`No se pudo enviar el correo.`);
    }
}
// Servicio de envío de correo
export const SendMailService = async (props: SendMailProps | SendMailProps[]): Promise<BaseResponseDto> => {
    loggerService.info(`[${thisFunctionName}] Iniciando servicio de envío de correo...`);
    if (Array.isArray(props)) {
        for (const emailProps of props) {
            await sendEmail(emailProps);
        }
        return buildOkResponse(null, `Correos enviados correctamente.`);
    } else {
       return await sendEmail(props);
    }

};