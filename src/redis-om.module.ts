import { DynamicModule, Module, Provider } from '@nestjs/common';
import { IRedisOmModuleOptions } from './interfaces/redis-om-options.interface';
import {
  ReidsOmOptionsFactory,
  RedisOmModuleAsyncOptions,
} from './interfaces/redis-om-async-options.interface';
import { createRedisOmProvider } from './redis-om.provider';

import { REDISOM_MODULE_OPTIONS } from './constants/redis-om.constants';
import { RedisOmService } from './redis-om.service';

@Module({
  providers: [RedisOmService],
  exports: [RedisOmService],
})
export class RedisOmModule {
  static forRoot(options: IRedisOmModuleOptions): DynamicModule {
    return {
      module: RedisOmModule,
      providers: createRedisOmProvider(options),
    };
  }

  static forRootAsync(options: RedisOmModuleAsyncOptions): DynamicModule {
    return {
      module: RedisOmModule,
      imports: options.imports || [],
      providers: this.createAsyncProvider(options),
    };
  }

  private static createAsyncProvider(
    options: RedisOmModuleAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    if (options.useClass) {
      return [
        this.createAsyncOptionsProvider(options),
        {
          provide: options.useClass,
          useClass: options.useClass,
        },
      ];
    }
    return [this.createAsyncOptionsProvider(options)];
  }

  private static createAsyncOptionsProvider(
    options: RedisOmModuleAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        provide: REDISOM_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    if (options.useClass || options.useClass) {
      return {
        provide: REDISOM_MODULE_OPTIONS,
        useFactory: async (optionsFactory: ReidsOmOptionsFactory) =>
          await optionsFactory.createRedisOmOptions(),
        inject: [options.useExisting || options.useClass],
      };
    }
    return {
      provide: REDISOM_MODULE_OPTIONS,
      useFactory: async (optionsFactory: ReidsOmOptionsFactory) =>
        await optionsFactory.createRedisOmOptions(),
      inject: [],
    };
  }
}
