import { Provider } from '@nestjs/common';
import { REDISOM_MODULE_OPTIONS } from './constants/redis-om.constants';
import { IRedisOmModuleOptions } from './interfaces/redis-om-options.interface';

export function createRedisOmProvider(
  options: IRedisOmModuleOptions,
): Provider[] {
  return [
    {
      provide: REDISOM_MODULE_OPTIONS,
      useValue: options || {},
    },
  ];
}
