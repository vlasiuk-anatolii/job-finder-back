import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from './user.schema';

const schemes = [{ name: 'User', schema: UserSchema }];

@Module({
  imports: [MongooseModule.forFeature(schemes)],
  exports: [MongooseModule.forFeature(schemes)],
})
export class SchemaModule {}
