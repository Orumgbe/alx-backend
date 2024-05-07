// Connect to redis server
import redis from 'redis';

// Create client
const client = redis.createClient({ host: 'localhost', port: 6379 });

// Listen for connection
client.on('connect', () => {
  console.log('Redis client connected to the server');
});

// Listen for connection failure
client.on('error', (error) => {
  console.log(`Redis client is not connected to the server: ${error}`);
});
