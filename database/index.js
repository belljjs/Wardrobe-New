

// pg-promise

// Loading and initializing the library:
const pgp = require('pg-promise')({
    // Initialization Options
});

// Preparing the connection details
// Heroku sets its own process.env.DATABASE_URL to the connection string --> add 'process.env.DATABASE_URL ||'
const cn = process.env.DATABASE_URL || 'postgres://postgres:minjin@localhost:5432//wardrobe-db';
const sslmode =  process.env.NODE_ENV === 'production';
// Creating a new database instance from the connection details:
const db = pgp(cn, sslmode);


// Exporting the database object for shared use:
module.exports = db;