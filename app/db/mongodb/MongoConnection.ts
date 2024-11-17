import mongoose, { Mongoose } from 'mongoose';
import logger from '@/logger/Logger';
// MONGO_CONNECTION=mongodb://crudUser:password@node1.cluster_mongo.local:27017,node2.cluster_mongo.local:27018,node3.cluster_mongo.local:27019/?retryWrites=true&loadBalanced=false&replicaSet=mongo_replica_set_1&readPreference=primary&serverSelectionTimeoutMS=5000&connectTimeoutMS=10000&authSource=crud&authMechanism=SCRAM-SHA-256


const MongoConnection = async () => {
    var connecting: Mongoose | null = null;
    if (parseInt(process.env.MONGODB_ENABLE || "0")) {
        try {
            const MONGO_USERNAME: string = process.env.MONGO_USERNAME as string;
            const MONGO_PASSWORD: string = process.env.MONGO_PASSWORD as string;
            const MONGO_NODES: string = process.env.MONGO_NODES as string;
            const MONGO_RETRY_WRITES: string = process.env.MONGO_RETRY_WRITES as string;
            const MONGO_LOAD_BALANCED: string = process.env.MONGO_LOAD_BALANCED as string;
            const MONGO_REPLICA_SET: string = process.env.MONGO_REPLICA_SET as string;
            const MONGO_READ_PREFERENCE: string = process.env.MONGO_READ_PREFERENCE as string;
            const MONGO_SERVER_SELECTION_TIMEOUT_MS: string = process.env.MONGO_SERVER_SELECTION_TIMEOUT_MS as string;
            const MONGO_CONNECT_TIMEOUT_MS: string = process.env.MONGO_CONNECT_TIMEOUT_MS as string;
            const MONGO_AUTH_SOURCE: string = process.env.MONGO_AUTH_SOURCE as string;
            const MONGO_AUTH_MECHANISM: string = process.env.MONGO_AUTH_MECHANISM as string;

            const dbUrl: string = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_NODES}/${MONGO_AUTH_SOURCE}?retryWrites=${MONGO_RETRY_WRITES}&loadBalanced=${MONGO_LOAD_BALANCED}&replicaSet=${MONGO_REPLICA_SET}&readPreference=${MONGO_READ_PREFERENCE}&serverSelectionTimeoutMS=${MONGO_SERVER_SELECTION_TIMEOUT_MS}&connectTimeoutMS=${MONGO_CONNECT_TIMEOUT_MS}&authSource=${MONGO_AUTH_SOURCE}&authMechanism=${MONGO_AUTH_MECHANISM}` as string;

            connecting = await mongoose.connect(dbUrl);
            logger.info("[MongoConnection - MongoConnection.ts]", { message: "Connection success"});
        } catch (error) {
            logger.error('[MongoConnection - MongoConnection.ts]', { message: error });
        }
        
    }
    return connecting;
};

export default MongoConnection;