import { Request, Response } from 'express';
import { MemcacheClient } from "memcache-client";
import HealthCheckAdapter from "@/src/Application/Adapters/v1/HealthCheck/HealthCheckAdapter";
import HealthCheckService from "@/src/Infrastructure/Services/v1/HealthCheck/HealthCheckService";
import HealthCheckTranformer from '@/src/Application/Transformers/v1/HealthCheck/HealthCheckTransformer';
import HealthCheckRepository from "@/src/Domain/Repositories/v1/HealthCheck/HealthCheckRepository";
import HealthChekEntity from "@/src/Domain/Entities/v1/HealthCheck/HealthCheckEntity";


class HealthCheckController {

    private adapter: HealthCheckAdapter;
    private service: HealthCheckService;
    private repository: HealthCheckRepository;
    private transformer: HealthCheckTranformer;

    constructor(memcached: MemcacheClient | null) {
        this.adapter = new HealthCheckAdapter();
        this.repository = new HealthCheckRepository(memcached);
        this.service = new HealthCheckService(this.repository);
        this.transformer = new HealthCheckTranformer();
    }
    async handle(_req: Request, res: Response) {
        const resp: HealthChekEntity = await this.transformer.transform(await this.service.run(await this.adapter.adapt(_req)));
        res.status(resp?.status ? 200 : 500).json(resp);
    }
};

export default HealthCheckController;