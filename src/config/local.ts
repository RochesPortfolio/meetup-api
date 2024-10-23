import { DataSourceOptions } from "typeorm";
import { Entities } from "../entities/entities.array";

const databaseConfig: DataSourceOptions =
{
    type: "mysql",
    port: 3306,
    host: "meetup-database.cxewu6gc4gul.us-east-2.rds.amazonaws.com",
    username: "admin",
    password: "rootRDS123!",
    database: "MeetUpDev",
    entities: Entities,
    logging: true,
    synchronize: false,
}

const accountTransport = {
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: "meetupdev427@gmail.com",
        clientId: "clientId",
        clientSecret: "clientSecret",
        refreshToken: "refreshToken",
        accessToken:""
    }
};

export const config = {
    server: {
        port: 3030,
    },
    db: databaseConfig,
    mailing: accountTransport
};
