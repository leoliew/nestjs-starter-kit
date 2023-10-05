import { Module } from '@nestjs/common';
import * as config from 'config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { AppConfig } from '../common/interfaces/config.interface';
const { debug, connections } = config.get('mongodb') as AppConfig['mongodb'];

mongoose.set('debug', debug);
@Module({
  imports: connections.map((connection) => {
    return MongooseModule.forRoot(
      connection.mongodbURI,
      Object.assign({ connectionName: connection.name }, connection.options),
    );
  }),
})
export class DatabaseModule {}
