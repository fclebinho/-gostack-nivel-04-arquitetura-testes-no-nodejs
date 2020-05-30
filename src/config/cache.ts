import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  driver: 'redis';
  config: {
    redis: RedisOptions;
  };
}

export default {
  driver: 'redis',
  config: {
    redis: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      family: 4, // 4 (IPv4) or 6 (IPv6)
      password: undefined,
      db: 0,
    },
  },
} as ICacheConfig;
