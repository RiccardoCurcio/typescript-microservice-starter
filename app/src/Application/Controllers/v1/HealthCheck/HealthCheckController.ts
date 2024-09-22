import { Request, Response } from 'express';
import { MemcacheClient } from "memcache-client";
import HealthCheckAdapter from "@/src/Application/Adapters/v1/HealthCheck/HealthCheckAdapter";
import HealthCheckService from "@/src/Infrastructure/v1/HealthCheck/Services/HealthCheckService";
import HealthCheckTranformer from '@/src/Application/Transformers/v1/HealthCheck/HealthCheckTransformer';

class HealthCheckController {

    private adapter: HealthCheckAdapter;
    private service: HealthCheckService;
    private transformer: HealthCheckTranformer;

    constructor(memcached: MemcacheClient | null) {
        this.adapter = new HealthCheckAdapter();
        this.service = new HealthCheckService(memcached);
        this.transformer = new HealthCheckTranformer();
    }
    async handle(_req: Request, res: Response) {
        res.status(200).json(await this.transformer.transform(await this.service.run(this.adapter.adapt(_req))));
    }
};

export default HealthCheckController;