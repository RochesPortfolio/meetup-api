import { format, transports, createLogger } from 'winston';

const loggerService = createLogger({
    level: 'debug',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.Console()
    ]
});

export default loggerService;