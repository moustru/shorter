import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from './redis.constants';

@Injectable()
export class RedisService {
  public constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  public async get<T>(key: string): Promise<T | null> {
    const value = await this.redis.get(key);

    return value ? (JSON.parse(value) as T) : null;
  }

  public async set<T>(
    key: string,
    value: T,
    ttlSeconds?: number,
  ): Promise<void> {
    const stringValue = JSON.stringify(value);

    if (ttlSeconds) {
      await this.redis.set(key, stringValue, 'EX', ttlSeconds);
    } else {
      await this.redis.set(key, stringValue);
    }
  }

  public async delete(key: string): Promise<void> {
    await this.redis.del(key);
  }

  public async flush(): Promise<void> {
    await this.redis.flushdb();
  }
}
