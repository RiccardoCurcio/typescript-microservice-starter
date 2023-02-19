import logger from '@/logger/Logger';
import {
    MemcacheClient,
    StatsCommandResponse,
} from "memcache-client";

const MemcachedConnection = async () => {
    var connecting: MemcacheClient | null = null;
    if (parseInt(process.env.MEMCACHED_ENABLE || "0")) {

        const server = process.env.MEMCACHED_CLUSTER || "";

        connecting = new MemcacheClient({ server, ignoreNotStored: true });
        logger.info('[Memcached - Connection.js]', { message: `connecting to ${(server.split(',')).join()}` });
        connecting.cmd<StatsCommandResponse>("stats").then((r) => {
            logger.info('[Memcached - Connection.js]', { message: `connected to ${(server.split(',')).join()}` });
        }, (error) => {
            process.env.MEMCACHED_ENABLE = "0"
            logger.warn('[Memcached - Connection.js]', { message: `MEMCACHED_ENABLE set to 0` });
            logger.error('[Memcached - Connection.js]', { message: error });
        });
    }
    return connecting;
}

export default MemcachedConnection;