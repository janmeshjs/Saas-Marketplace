const redis = require('redis');
const { promisify } = require('util');

// Create a Redis client
const client = redis.createClient();

// Promisify Redis commands
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

module.exports = { getAsync, setAsync };
