import logger from '@/logger/Logger';
import CreateRepository from "@/src/Domain/Repositories/v1/Create/CreateRepository";
import CreateEntity from "@/src/Domain/Entities/v1/User/UserEntity";


class CreateService {
    
    private repository: CreateRepository;

    constructor(repository: CreateRepository) {
        this.repository = repository;
    }
    async run(entity: CreateEntity): Promise<CreateEntity> {
        try {
            return await this.repository.create(entity);
        } catch (e) {
            let error = (e as Error);
            logger.error('[CreateService - CreateService.ts]', { message: error.message });
            throw Error(error.message);
        
        }
        
    }
};

export default CreateService;