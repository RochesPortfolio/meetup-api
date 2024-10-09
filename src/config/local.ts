import { DataSourceOptions } from "typeorm";
import { Entities } from "../entities/entities.array";
import { User } from "../entities/user.entity";
import { Empresa } from "../entities/empresa.entity";
import { Evento } from "../entities/evento.entity";
import { GastosEvento } from "../entities/gastoEvento.entity";
import { Invitacion } from "../entities/invitacion.entity";
import { Patrocinador } from "../entities/patrocinador.entity";
import { Patrocinio } from "../entities/patrocinio.entity";
import { Persona } from "../entities/persona.entity";
import { Proveedor } from "../entities/proveedor.entity";
import { ProveedoresEvento } from "../entities/proveedoresEvento.entity";
import { Segmento } from "../entities/segmento.entity";


const databaseConfig: DataSourceOptions =
{
    type: "mysql",
    host: "meetup-database.cxewu6gc4gul.us-east-2.rds.amazonaws.com",
    port: 3306,
    username: "username",
    password: "password",
    database: "MeetUpDev",
    // agregar las entidades a la configuración
    entities: [
        User,
        Empresa,
        Evento,
        GastosEvento,
        Invitacion,
        Patrocinador,
        Patrocinio,
        Persona,
        Proveedor,
        ProveedoresEvento,
        Segmento
    ],
    logging: true,
    synchronize: true,
}

export const config = {
    server: {
        port: 3030,
    },
    db: databaseConfig
};
