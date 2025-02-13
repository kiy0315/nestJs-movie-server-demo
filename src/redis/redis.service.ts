import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';  // ioredis를 default로 불러옵니다.

@Injectable()
export class RedisService {
  private redisClient: Redis;  // Redis 타입을 Redis.Redis로 지정합니다.

  constructor() {
    this.redisClient = new Redis({
      host: 'localhost',
      port: 6379,
    });
  }

  async setLock(key: string, value: string, ttl: number): Promise<boolean> {
    const result = await this.redisClient.set(key, value, 'EX', ttl, 'NX');
    return result === 'OK';
  }

  async releaseLock(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  async getLock(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }
}
