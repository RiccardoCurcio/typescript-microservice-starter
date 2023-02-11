import { createLogger, format, transports } from 'winston';
import CustomFormat from '@/logger/CustomFormat';

const { combine, timestamp, label } = format;

/**
 * 
 */
const logger = createLogger({
    transports: [
        new transports.Console()
    ],
    format: combine(
        format.json(),
        label({ label: process.env.SERVICE_NAME }),
        timestamp(),
        CustomFormat
    ),
});

export default logger;