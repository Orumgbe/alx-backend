import { promisify } from 'util';
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
  client.set(schoolName, value, redis.print);
}

// Promisify redis get method
const myPromise = promisify(client.get).bind(client);
// Prints value of the given key in the redis database
async function displaySchoolValue(schoolName) {
  try {
    const reply = await myPromise(schoolName);
    console.log(reply);
  } catch (error) {
    console.log(error.message);
  }
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
