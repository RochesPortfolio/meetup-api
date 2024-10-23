import { createTransport, Transporter } from 'nodemailer';
import { google } from 'googleapis';
import { config } from '../config/local';
import loggerService from './logger.service';
import { buildMailBody } from '../mail-templates/html-mail-body.builder';
import { MailTemplateType } from '../mail-templates/interfaces/mail-template.type';
import { buildOkResponse, BaseResponseDto } from '../dtos/base-response.dto';
import { myDataSource } from '../database/app-data-source';
import { Invitacion } from '../entities/invitacion.entity';
const thisFunctionName = 'SendMailService';
import { v4 as uuidv4 } from 'uuid';
import { Persona } from '../entities/persona.entity';
import { Evento } from '../entities/evento.entity';

export interface SendMailProps {
    from: string;
    to: string;
    subject: string;
    mailTemplateType: MailTemplateType;
    hash_evento: string;
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

const createNewInvite = async (to: string, hash_evento: string, mailTemplateType: string): Promise<Invitacion> => {
    const persona = await findPersonaByEmail(to);
    const evento = await findEventoByHash(hash_evento);

    if (!persona || !evento || persona?.id_empresa === null) {
        const newInvite = new Invitacion();
        newInvite.hash_invite = uuidv4();
        newInvite.id_persona = persona;
        newInvite.id_empresa = persona?.id_empresa;
        newInvite.id_evento = evento;
        newInvite.estado_invitacion = 'Fallida';
        newInvite.fecha_invitacion = new Date().toISOString();
        newInvite.notas = `No se encontró la persona o el evento asociado o le faltan datos. mail: ${to}`;
        newInvite.tipo_invitacion = mailTemplateType as MailTemplateType;

        await myDataSource.getRepository(Invitacion).save(newInvite);
        throw new Error('No se encontró la persona o el evento asociado o le faltan datos');
    }

    const newInvite = new Invitacion();
    newInvite.hash_invite = uuidv4();
    newInvite.id_persona = persona;
    newInvite.id_empresa = persona.id_empresa;
    newInvite.id_evento = evento;
    newInvite.estado_invitacion = 'Pendiente';
    newInvite.fecha_invitacion = new Date().toISOString();
    newInvite.fecha_confirmacion = null;
    newInvite.notas = null;
    newInvite.tipo_invitacion = mailTemplateType as MailTemplateType;

    return newInvite;
};
const sendEmail = async (props: SendMailProps): Promise<BaseResponseDto> => {

    const { from, to, subject, mailTemplateType, hash_evento } = props;

    const html = buildMailBody(mailTemplateType);

    try {
        const transporter = await createTransporter();
        const mailOptions = { from, to, subject, html };

        loggerService.info(`Enviando correo a: ${to}`,);
        const info = await transporter.sendMail(mailOptions);
        loggerService.info(`Correo enviado: ${info.response}`);

        const newInvite = await createNewInvite(to, hash_evento, mailTemplateType);


        try {
            await myDataSource.getRepository(Invitacion).save(newInvite);
            loggerService.info(`Invitación guardada correctamente! to: ${to}`);
            return buildOkResponse(info.response, `Correo enviado correctamente.`);
        } catch (error) {
            loggerService.error(`Error guardando la invitación en la base de datos:`, error);
            throw new Error(`No se pudo guardar la invitación en la base de datos.`);
        }
    } catch (error) {
        loggerService.error(`Error enviando correo:`, error);
        throw new Error(`No se pudo enviar el correo.`);
    }
}

const findPersonaByEmail = async (email: string): Promise<Persona> => {
    const persona = await myDataSource.getRepository(Persona).findOne({ where: { correo: email }, relations: ['id_empresa'] },);
    if (!persona) {
        throw new Error(`No se encontró la persona con el correo: ${email}`);
    }

    if (!persona.id_empresa) {
        loggerService.error(`La persona con el correo: ${email} no tiene empresa asociada.`);
        return null;
    }
    return persona;

}

const findEventoByHash = async (hash: string): Promise<Evento> => {
    const evento = await myDataSource.getRepository(Evento).findOne({ where: { hash_evento: hash } });
    if (!evento) {
        throw new Error(`No se encontró el evento con el hash: ${hash}`);
    }
    return evento;

}

// Servicio de envío de correo
export const SendMailService = async (props: SendMailProps | SendMailProps[]): Promise<BaseResponseDto> => {
    loggerService.info(`[${thisFunctionName}] Iniciando servicio de envío de correo...`);
    if (Array.isArray(props)) {
        for (const emailProps of props) {
            try {
                await sendEmail(emailProps);
            } catch (error) {
                loggerService.error(`Error enviando correo a : ${emailProps.to}`, error);
                continue;
            }
        }
        return buildOkResponse(null, `Correos enviados correctamente.`);
    } else {
        return await sendEmail(props);
    }

};