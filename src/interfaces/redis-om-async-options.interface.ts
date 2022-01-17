import { ModuleMetadata, Type } from '@nestjs/common';
import { IRedisOmModuleOptions } from './redis-om-options.interface';

export interface ReidsOmOptionsFactory {
  createRedisOmOptions():
    | Promise<IRedisOmModuleOptions>
    | IRedisOmModuleOptions;
}

export interface RedisOmModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<ReidsOmOptionsFactory>;
  useExisting?: Type<ReidsOmOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<IRedisOmModuleOptions> | IRedisOmModuleOptions;
}
