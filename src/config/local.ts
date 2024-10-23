import { DataSourceOptions } from "typeorm";
import { Entities } from "../entities/entities.array";
import * as dotenv from 'dotenv';

dotenv.config();
const databaseConfig: DataSourceOptions = {
    type: process.env.DB_TYPE as any,
    port: parseInt(process.env.DB_PORT || '3306'),
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: Entities,
    logging: false,
    synchronize: true,
};

const accountTransport = {
    service: process.env.GMAIL_SERVICE,
    auth: {
        type: process.env.GMAIL_AUTH_TYPE,
        user: process.env.GMAIL_USER,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: process.env.GMAIL_ACCESS_TOKEN,
    }
};

export const config = {
    server: {
        port: 3030,
    },
    db: databaseConfig,
    mailing: accountTransport
};
