import { Express } from "express-serve-static-core";
import { MemcacheClient } from "memcache-client";
import healthcheckV1 from "@/src/Application/Routes/v1/HealthCheck/HealthCheck";

/**
 * 
 * @param app Express
 */
const routes = (app: Express, memcached: MemcacheClient | null) => {

    healthcheckV1(app, memcached);

    app.use(async (_req, res, _next) => {
        res.status(404).json({
            message: `Route not found`
        });
    });
};

export default routes;