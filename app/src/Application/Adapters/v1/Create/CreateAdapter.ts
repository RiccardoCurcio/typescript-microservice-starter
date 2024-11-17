import { Request } from 'express';
import * as crypto from 'crypto';
import CreateEntity from '@/src/Domain/Entities/v1/User/UserEntity';

class CreateAdapter {
    constructor() { }
    async adapt(_req: Request): Promise<CreateEntity> {
        const secret = process.env.SECRET || "";
        return {
            id: "",
            username: _req.body["username"],
            email: _req.body["email"],
            enable: _req.body["enable"],
            password: crypto.createHmac('sha256', secret)
                .update(_req.body["password"])
                .digest('hex'),
            createdAt: null,
            updatedAt: null,
            deletedAt: null
        };;
    }
};

export default CreateAdapter;