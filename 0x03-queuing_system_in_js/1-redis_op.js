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

// Sets new key value pair to the redis database
function setNewSchool(schoolName, value) {
  client.SET(schoolName, value, redis.print);
}

// Prints value of the given key in the redis database
function displaySchoolValue(schoolName) {
  client.GET(schoolName, (err, reply) => {
    if (err) {
      console.log(err.message);
    } else if (reply) {
      console.log(reply);
    }
  });
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
