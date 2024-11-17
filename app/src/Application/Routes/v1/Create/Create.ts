import { Express } from "express-serve-static-core";
import { MemcacheClient } from "memcache-client";
import CreateController from "@/src/Application/Controllers/v1/Create/CreateController";

const create = (app: Express, memcached: MemcacheClient | null) => {
    const CreateV1 = new CreateController(memcached);
    const MONGO_COLLECTION: string = process.env.MONGO_COLLECTION as string;
    app.post(`/v1/${MONGO_COLLECTION}`, async (_req, res) => {
       await CreateV1.handle(_req, res);
    });
};


export default create;