import HealthChekEntity from "@/src/Domain/Entities/v1/HealthCheck/HealthCheckEntity";
class HealthCheckTranformer {
    constructor() {}
    async transform(entity: HealthChekEntity): Promise<HealthChekEntity> {
        return entity;
    }
};

export default HealthCheckTranformer;