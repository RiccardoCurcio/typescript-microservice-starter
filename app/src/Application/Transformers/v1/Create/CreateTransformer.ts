import CreateEntity from "@/src/Domain/Entities/v1/User/UserEntity";
class CreateTranformer {
    constructor() {}
    async transform(entity: CreateEntity): Promise<CreateEntity> {
        return entity;
    }
};

export default CreateTranformer;