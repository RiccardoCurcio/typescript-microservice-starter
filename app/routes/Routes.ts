import { Express } from "express-serve-static-core";

/**
 * 
 * @param app Express
 */
const routes = (app: Express) => {

    app.get('/healthcheck', function (_req, res) {
        res.status(200).json({ message: 'healthcheck success!' });
    });

    app.use((_req, res, _next) => {
        res.status(404).json({
            message: 'Route not found'
        });
    });
};

export default routes;