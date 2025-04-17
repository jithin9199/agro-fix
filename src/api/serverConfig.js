/**
 * Server configuration for Neon PostgreSQL connection
 * This file would be used in a Node.js backend, not directly in the React application
 */

// Configuration for Neon PostgreSQL database
const neonConfig = {
  host: process.env.DB_HOST || 'ep-some-host-id.us-east-2.aws.neon.tech',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'agrofixx',
  user: process.env.DB_USER || 'neon_db_user',
  password: process.env.DB_PASSWORD || 'your_secure_password',
  ssl: true, // Neon requires SSL/TLS
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 2000, // How long to wait for a connection
};

/**
 * Example pool setup for production use on backend server
 * This code should be used in a separate Node.js backend service, not in React
 */

/*
const { Pool } = require('pg');

// Create a connection pool
const pool = new Pool(neonConfig);

// Pool error handling
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Example query function
async function query(text, params) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('Executed query', { text, duration, rows: res.rowCount });
  return res;
}

// Example function to get a client from the pool
async function getClient() {
  const client = await pool.connect();
  const originalRelease = client.release;
  
  // Override the release method to log duration
  client.release = () => {
    client.query_count = 0;
    originalRelease();
  };
  
  return client;
}

module.exports = {
  query,
  getClient,
  pool,
};
*/

// Export the configuration (for documentation purposes in React app)
module.exports = {
  neonConfig,
  info: {
    type: 'PostgreSQL',
    provider: 'Neon.tech',
    connectionMethod: 'Connection should be handled server-side in a Node.js backend',
  }
}; 