import { MemcacheClient } from "memcache-client";
import HealthCheckRepository from "@/src/Domain/Repositories/v1/HealthCheck/HealthCheckRepository";
import HealthChekEntity from "@/src/Domain/Entities/v1/HealthCheck/HealthCheckEntity";


class HealthCheckService {
    
    private repository: HealthCheckRepository;

    constructor(repository: HealthCheckRepository) {
        this.repository = repository;
    }
    async run(entity: HealthChekEntity): Promise<HealthChekEntity> {
        return await this.repository.check(entity);
    }
};

export default HealthCheckService;