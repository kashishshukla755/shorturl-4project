
const redis = require("redis");

const { promisify } = require("util");

//Connect to redis
const redisClient = redis.createClient(
    17983,
  "redis-17983.c74.us-east-1-4.ec2.cloud.redislabs.com ",

  { no_ready_check: true }
);
redisClient.auth("W1ZrPOS3PmtQglr3iwL4yM4MchtUqYg8", function (err) {
  if (err) throw err;
});

redisClient.on("connect", async function () {
  console.log("Connected to Redis..");
});



//1. connect to the server
//2. use the commands :

//Connection setup for redis

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);