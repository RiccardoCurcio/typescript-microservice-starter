import { MemcacheClient } from "memcache-client";

class HealthCheckService {
    constructor(memcached: MemcacheClient | null) {}
    async run(entity: Object): Promise<Object> {
        return { message: `healthcheck success!` };
    }
};

export default HealthCheckService;