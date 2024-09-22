import { Express } from "express-serve-static-core";
import { MemcacheClient } from "memcache-client";
import HealthCheckController from "@/src/Application/Controllers/v1/HealthCheck/HealthCheckController";

const healthcheck = (app: Express, memcached: MemcacheClient | null) => {
    const healthcheckV1 = new HealthCheckController(memcached);
    app.get('/v1/healthcheck', async (_req, res) => {
       await healthcheckV1.handle(_req, res);
    });
};


export default healthcheck;