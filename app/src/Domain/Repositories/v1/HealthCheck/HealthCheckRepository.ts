import { MemcacheClient } from "memcache-client";
import HealthChekEntity from "@/src/Domain/Entities/v1/HealthCheck/HealthCheckEntity";

class HealthCheckRepository {
    
    private memcached: MemcacheClient | null;

    constructor(memcached: MemcacheClient | null) {
        this.memcached = memcached;
    }
    async check(entity: HealthChekEntity): Promise<HealthChekEntity> {
        let mc_status = true;
        
        if (entity.mc_enable) {
            await this.memcached!.set("healthcheck", "healthcheck-ok");
            let data = await this.memcached!.get<string>("healthcheck");
            mc_status = data?.value == "healthcheck-ok";
            await this.memcached!.delete("healthcheck");
        }

        const status = mc_status;
        
        entity.mc_status = mc_status;
        entity.status = status;
        entity.message = entity.status ? `healthcheck success!` : `healthcheck error!`;

        return entity;
    }
};

export default HealthCheckRepository;