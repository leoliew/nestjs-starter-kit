import { caching } from 'cache-manager';
import * as _ from 'lodash';

class CacheManager {
  private static memoryCache: any;

  public static async initMemoryCache() {
    if (!CacheManager.memoryCache) {
      CacheManager.memoryCache = await caching('memory');
    }
  }

  public static getMemoryCache() {
    return CacheManager.memoryCache;
  }
}

export const Cacheable = ({ ttl }: { ttl: number }): MethodDecorator => {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor,
  ) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: any[]) {
      await CacheManager.initMemoryCache();
      const memoryCache = CacheManager.getMemoryCache();
      const cacheKey = `${propertyKey.toString()}:${JSON.stringify(args)}`;
      const cacheValue = await memoryCache.get(cacheKey);
      if (_.isEmpty(cacheValue)) {
        const result = await originalMethod.apply(this, args);
        await memoryCache.set(cacheKey, result, ttl);
        return result;
      } else {
        return cacheValue;
      }
    };
  };
};
