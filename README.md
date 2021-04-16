# @accordo-feed/azure-redis-cache-lib

## What does it do?

Library for interacting with Azure Redis Cache

## How to use it?

```
const redisProcessor = require('./redisProcessor');
const redisClient = await redisProcessor.getAsyncRedisClient(REDISCACHEHOSTNAME, REDISCACHEKEY);
```

## To terminate the connection

```
await redisClient.quit()
```


## To set a key on Redis

```
const res = await redisClient.setRedisKey(redisKey, value);
```

Passing the third parameter so the string can be compressed on Redis

```
const res = await redisClient.setRedisKey(redisKey, value, toBeCompressed);
```
    
## To get a value from Redis
   
```
const res = await redisClient.getRedisKey(redisKey);
```
If the value was compressed previously, set the second parameter so the value can be uncompressed
```
const res = await redisClient.getRedisKey(redisKey, isCompressed);
```

## To delete a key from Redis

```
const res = await redisClient.delRedisKey(redisKey);
```



