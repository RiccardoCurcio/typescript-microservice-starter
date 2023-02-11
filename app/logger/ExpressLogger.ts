import { format, transports } from 'winston';
import expressWinston from 'express-winston';
const { combine, timestamp, label } = format;

import CustomFormat from '@/logger/CustomFormat';

/**
 * 
 */
const expressLogger = expressWinston.logger({
    transports: [
        new transports.Console()
    ],
    format: combine(
        format.json(),
        label({ label: process.env.SERVICE_NAME }),
        timestamp(),
        CustomFormat
    ),
    msg: "HTTP  ",
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) { return false; }
});


export default expressLogger;