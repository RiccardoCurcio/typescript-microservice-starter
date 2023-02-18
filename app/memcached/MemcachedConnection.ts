import logger from '@/logger/Logger';
import { Client } from 'memjs';

const MemcachedConnection = async () => {
    var connecting: Client;
    if (parseInt(process.env.MEMCACHED_ENABLE || "0")) {

        const cluster = process.env.MEMCACHED_CLUSTER || "";
        connecting = Client.create(cluster, {
            retries: 2,
            timeout: 100
        });
        logger.info('[Memcached - Connection.js]', { message: `connecting to ${(cluster.split(',')).join()}` });
        connecting.stats((error, server, stats) => {
            
            if (!error) {
                logger.info('[Memcached - Connection.js]', {message: `conected to ${server}`});
            } else {
                process.env.MEMCACHED_ENABLE = "0";
                logger.error('[Memcached - Connection.js]', { message: error?.message });
                logger.warn('[Memcached - Connection.js]', { message: `Memcached has been disabled; MEMCACHED_ENABLE set ${process.env.MEMCACHED_ENABLE}` });
            }
            
        });
        return connecting;

    }
    return null;
}

export default MemcachedConnection;