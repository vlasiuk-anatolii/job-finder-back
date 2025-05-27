import { Global, Module } from '@nestjs/common';

import { UserRepository } from './user.repository';
import { SchemaModule } from './schema/@schema.module';

const repositories = [UserRepository];

@Global()
@Module({
  imports: [SchemaModule],
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoryModule {}
