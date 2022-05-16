import getPort from 'get-port';
import request, { SuperTest, Test } from 'supertest';
import temp from 'temp';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Server } from 'http';

import logger from '../logger';
import { main, close } from '../src/db';
import app from '../src/app';

temp.track();

export type SetupContext = {
  mongod: MongoMemoryServer;
  port: number;
  request: SuperTest<Test>;
  server: Server;
};

export async function setup(this: SetupContext) {
  this.mongod = await MongoMemoryServer.create();

  const port = await getPort();

  this.port = port;

  this.request = request(`http://localhost:${port}`);

  try {
    await main(this.mongod.getUri()).then(() => {
      this.server = app.listen(this.port, () => logger.info(`Server is listening on port ${this.port}...`));
    });
  } catch (error) {
    logger.error(error as Error);
    throw error;
  }
}

export async function teardown(this: SetupContext) {
  await close();
  this.server.close();
  await this.mongod.stop();
}
