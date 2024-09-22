import { Request } from 'express';

class HealthCheckAdapter {
    constructor() {}
    async adapt(_req: Request): Promise<object> {
        return {};
    }
};

export default HealthCheckAdapter;