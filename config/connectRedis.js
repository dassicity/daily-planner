const Redis = require("redis");

const RedisClient = Redis.createClient();

// RedisClient.connect();
RedisClient.on('error', err => console.log('Redis Client Error', err));


module.exports = RedisClient;