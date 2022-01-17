import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Client } from 'redis-om';
import { REDISOM_MODULE_OPTIONS } from './constants/redis-om.constants';
import { IRedisOmModuleOptions } from './interfaces/redis-om-options.interface';

@Injectable()
export class RedisOmService implements OnModuleInit, OnModuleDestroy {
  public client: Client | undefined;

  constructor(
    @Inject(REDISOM_MODULE_OPTIONS)
    private readonly options: IRedisOmModuleOptions
  ) {}

  async onModuleInit() {
    let url = '';

    if (this.options.url) {
      url = this.options.url;
    } else {
      url = `redis://${this.options.username}:${this.options.password}@${this.options.host}:${this.options.port}`;
    }

    if (!this.client) {
      try {
        this.client = new Client();
        await this.client.open(url);
      } catch (error) {
        console.log(error);
      }
    }
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.close();
    }
  }
}
