import { Request } from 'express';
import HealthChekEntity from '@/src/Domain/Entities/v1/HealthCheck/HealthCheckEntity';

class HealthCheckAdapter {
    constructor() {}
    async adapt(_req: Request): Promise<HealthChekEntity> {
        return {
            mc_enable: !!parseInt(process.env.MEMCACHED_ENABLE || "0"),
            mc_status: false,
            status: false,
            message: null
        };;
    }
};

export default HealthCheckAdapter;