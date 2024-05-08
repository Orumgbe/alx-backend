import { createClient } from 'redis';

const client = createClient({ host: 'localhost', port: 6379 });

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.on('error', (error) => {
  console.log(`Redis client not connected to the server: ${error}`);
});

client.subscribe('holberton school channel');

// Listen for messages on channel
client.on('message', (channel, message) => {
  console.log(message);
  if (message === 'KILL_SERVER') {
    client.unsubscribe(channel);
    client.quit();
  }
});
