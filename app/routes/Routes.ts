import { Express } from "express-serve-static-core";
import { MemcacheClient } from "memcache-client";

/**
 * 
 * @param app Express
 */
const routes = (app: Express, memcached: MemcacheClient | null) => {

    app.get('/healthcheck', async (_req, res) => {
        res.status(200).json({ message: `healthcheck success!` });
    });

    app.use(async (_req, res, _next) => {
        res.status(404).json({
            message: `Route not found`
        });
    });
};

export default routes;