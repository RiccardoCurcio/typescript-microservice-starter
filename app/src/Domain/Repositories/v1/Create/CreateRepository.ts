import { MemcacheClient } from "memcache-client";
import { model, Document, Types } from "mongoose";
import moment from 'moment';
import logger from '@/logger/Logger';
import UserEntity from "@/src/Domain/Entities/v1/User/UserEntity";
import IUser from "@/db/mongodb/Interfaces/IUser";
import userSchema from "@/db/mongodb/Schemas/UserSchema";

class CreateRepository {

    private memcached: MemcacheClient | null;
    private collection: string;

    constructor(memcached: MemcacheClient | null) {
        this.memcached = memcached;
        this.collection = process.env.MONGO_COLLECTION as string;
    }

    /**
     * 
     * @param entity 
     * @returns 
     */
    async create(entity: UserEntity): Promise<UserEntity> {
        try {
            const User = model<IUser>(this.collection, userSchema);
            const user = new User({
                username: entity.username,
                email: entity.email,
                enable: entity.enable,
                password: entity.password,
                createdAt: new Date(),
                updatedAt: null,
                deletedAt: null,
            });
            await user.save();

            entity = await this.map(user, entity);

            await this.setInCache(entity);
        } catch (e) {
            let error = (e as Error);
            logger.error('[CreateRepository - CreateRepository.ts]', { message: error.message });
            throw Error(error.message);
        }

        return entity;
    }

    /**
     * 
     * @param user 
     * @param entity 
     * @returns 
     */
    private async map(user: Document<unknown, {}, IUser> & IUser & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }, entity: UserEntity): Promise<UserEntity> {
        entity.id = user._id.toString();
        entity.username = user.username;
        entity.email = user.email;
        entity.enable = user.enable;
        entity.password = user.password;
        entity.createdAt = user.createdAt ? (moment.utc(user.createdAt)).format('YYYY-MM-DD HH:mm:ss') : null;
        entity.updatedAt = user.updatedAt?.toDateString() || null;
        entity.deletedAt = user.deletedAt?.toDateString() || null;
        return entity;
    }

    /**
     * 
     * @param entity 
     */
    private async setInCache(entity: UserEntity) {
        if (entity.id) {
            this.memcached?.set(entity.id, JSON.stringify(entity));
        }

    }
};

export default CreateRepository;