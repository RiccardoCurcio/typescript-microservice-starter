import { Request, Response } from 'express';
import { MemcacheClient } from "memcache-client";
import logger from '@/logger/Logger';
import CreateAdapter from "@/src/Application/Adapters/v1/Create/CreateAdapter";
import CreateService from "@/src/Infrastructure/Services/v1/Create/CreateService";
import CreateTranformer from '@/src/Application/Transformers/v1/Create/CreateTransformer';
import CreateRepository from "@/src/Domain/Repositories/v1/Create/CreateRepository";
import CreateEntity from "@/src/Domain/Entities/v1/User/UserEntity";


class CreateController {

    private adapter: CreateAdapter;
    private service: CreateService;
    private repository: CreateRepository;
    private transformer: CreateTranformer;

    constructor(memcached: MemcacheClient | null) {
        this.adapter = new CreateAdapter();
        this.repository = new CreateRepository(memcached);
        this.service = new CreateService(this.repository);
        this.transformer = new CreateTranformer();
    }
    async handle(_req: Request, res: Response) {
        try {
            const resp: CreateEntity = await this.transformer.transform(await this.service.run(await this.adapter.adapt(_req)));
            res.status(200).json(resp);
        } catch (e) {
            let error = (e as Error);
            logger.error('[CreateController - CreateController.ts]', { message: error.message });
            res.status(400).json({message: error.message});
        }
    }
};

export default CreateController;