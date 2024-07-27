import { DataSourceOptions } from "typeorm";
import { User } from "../entities/user.entity";


const databaseConfig: DataSourceOptions =
{
    type: "mysql",
    host: "host",
    port: 3306,
    username: "username",
    password: "password",
    database: "MeetUpDev",
    // agregar las entidades a la configuración
    entities: [
        User
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
