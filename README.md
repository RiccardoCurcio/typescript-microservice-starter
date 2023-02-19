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
DISABLE_SCALING=1 # default 0

# MEMCACHED
MEMCACHED_ENABLE=1 # default 0
MEMCACHED_CLUSTER=127.0.0.1:11211,127.0.0.1:11212

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
GET http://localhost:8081/healthcheck
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