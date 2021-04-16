const redis = require('redis');
const { promisify } = require('util');
const { zip, unzip } = require('./zipHelper');

const getAsyncRedisClient = async (
  redisHostName,
  redisKey,
  redisPort = 6380
) => {
  const redisClient = redis.createClient(redisPort, redisHostName, {
    auth_pass: redisKey,
    tls: { servername: redisHostName }
  });
  return {
    setRedisKey: async (key, value, toBeCompressed = false) => {
      if (!value)
        throw 'Value cannot be null or undefined';
      return await promisify(redisClient.set).bind(redisClient)(
        key,
        toBeCompressed ? await zip(value) : value
      );
    },
    getRedisKey: async (key, isCompressed = false) => {
      const result = await promisify(redisClient.get).bind(redisClient)(key);
      return result && isCompressed ? await unzip(result) : result;
    },
    delRedisKey: async key =>
      await promisify(redisClient.del).bind(redisClient)(key),
    quit: async () => await redisClient.QUIT()
  };
};

module.exports = {
  getAsyncRedisClient
};
