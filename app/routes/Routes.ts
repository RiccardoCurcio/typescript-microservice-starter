import { Express } from "express-serve-static-core";
import { Client } from 'memjs';

/**
 * 
 * @param app Express
 */
const routes = (app: Express, memcached: Client | null) => {

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