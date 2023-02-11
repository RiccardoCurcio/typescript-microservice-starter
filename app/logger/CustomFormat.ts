import { format } from 'winston';

const { printf } = format;

/**
 * 
 */
const CustomFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

export default CustomFormat;