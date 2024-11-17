# Typescript microservice starter

Node version 16.0.0 or more

* cluster
* cors
* express
* jest
* nodemon
* memcached (mcrouter supported)


# Getting Started

## Install
```bash
$ npm install
```

## Create .env end edit it
```bash
$ cp .env.example .env
$ vim .env
```

```
SERVICE_NAME=boilerplate_app
ENV=local
PREFIX=boilerplate

PORT=8081
ADDRESS=0.0.0.0

MAX_CPU=4 # default 0 max possible cpu
DISABLE_SCALING=0 # default 0

# SECRET
SECRET=secret

# MEMCACHED
MEMCACHED_ENABLE=1
MEMCACHED_CLUSTER=127.0.0.1:11211

# MONGO DB
MONGODB_ENABLE=1
MONGO_USERNAME=crudUser
MONGO_PASSWORD=password
MONGO_COLLECTION=users
MONGO_NODES=node1.cluster_mongo.local:27017,node2.cluster_mongo.local:27018,node3.cluster_mongo.local:27019
MONGO_RETRY_WRITES=true
MONGO_LOAD_BALANCED=false
MONGO_REPLICA_SET=mongo_replica_set_1
MONGO_READ_PREFERENCE=primary
MONGO_SERVER_SELECTION_TIMEOUT_MS=5000
MONGO_CONNECT_TIMEOUT_MS=10000
MONGO_AUTH_SOURCE=crud
MONGO_AUTH_MECHANISM=SCRAM-SHA-256
```

## Run dev
```bash
$ npm run dev
``` 

## Build
```bash
$ npm run build
```

## Run start
```bash
$ npm run start
```

## Run test
```bash
$ npm run test
```

# APIs

## Healthcheck

Request
``` 
GET http://localhost:8081/v1/healthcheck
```

Response success
``` 
status code 200

header:

    Content-Type: application/json

body: 

    {
	    "message": "healthcheck success!"
    }
```