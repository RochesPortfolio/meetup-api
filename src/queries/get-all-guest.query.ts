import { Request, Response } from "express";
import { myDataSource } from "../database/app-data-source";
import { Invitacion } from "../entities/invitacion.entity";

export const getAllInvites = async (req: Request, res: Response) => {
    try {
        const invitations = myDataSource.getRepository(Invitacion);

        const guest = await invitations
                        .createQueryBuilder('invitacion')
                        .leftJoinAndSelect('invitacion.id_persona', 'persona')
                        .leftJoinAndSelect('invitacion.id_empresa', 'empresa')
                        .addSelect('empresa.nombre', 'nombre_empresa')
                        .select([
                            'invitacion.fecha_invitacion',
                            'invitacion.fecha_confirmacion',
                            'invitacion.estado_invitacion',
                            'invitacion.notas',
                            'invitacion.hash_invite',
                            'persona.nombres',
                            'persona.apellidos',
                            'persona.correo',
                            'persona.telefono',
                            'persona.genero',
                            'empresa.rubro_negocio'
                        ])
                        .getMany();
        res.json(guest);
    } catch (error) {
        console.log(error)
    }
};