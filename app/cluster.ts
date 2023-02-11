import cluster from 'node:cluster';
import os from 'os';
import serverIstance from '@/server';
import logger from '@/logger/Logger';

logger.info('[Node]', { message: `current version ${process.version}` });
const m = process.version.match(/(\d+)\.(\d+)\.(\d+)/) || ["0", "0", "0"];
const [major, minor, patch] = m.slice(1).map(_ => parseInt(_));

if (major >= 16) {
    const maxCpu = parseInt(process.env.MAX_CPU || "0");
    const disableScaling = parseInt(process.env.DISABLE_SCALING || "0");
    let cpus = maxCpu != 0 ? maxCpu : os.cpus().length;

    cpus = cpus > os.cpus().length ? os.cpus().length : cpus;

    const range = (from: number, to: number, step: number) =>
        [...Array(Math.floor((to - from) / step) + 1)].map((_, i) => from + i * step);

    const forkProcess = () => {
        logger.info('[cluster]', { message: `Forking for ${cpus} CPUs` });
        range(1, cpus, 1).map(() => { cluster.fork(); });
    };

    const noForkProcess = () => {
        logger.info('[cluster]', { message: `Scaling is disabled!` });
        serverIstance();
    };

    const startCluster = () => {
        !cluster.isPrimary ? serverIstance() : forkProcess();
    }

    disableScaling !== 0 ? noForkProcess() : startCluster();
} else {
    logger.error('[Node]', { message: `${process.env.SERVICE_NAME} needs node to version v16.0.0 or more but current version is ${process.version}` });
    console.log('If you use nvm you can set the version: nvm use v16.15.6');
}



