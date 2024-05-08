import redis from 'redis';

// Client to run node-redis methods
const client = redis.createClient();

const hashKey = 'HolbertonSchools';

// Save key value pairs to the same hash group
client.hset(hashKey, 'Portland', 50, redis.print);
client.hset(hashKey, 'Seattle', 80, redis.print);
client.hset(hashKey, 'New York', 20, redis.print);
client.hset(hashKey, 'Bogota', 20, redis.print);
client.hset(hashKey, 'Cali', 40, redis.print);
client.hset(hashKey, 'Paris', 2, redis.print);

const data = client.hgetall(hashKey, (err, data) => {
  if (err) console.log(error.message);
  if (data) console.log(data);
});
