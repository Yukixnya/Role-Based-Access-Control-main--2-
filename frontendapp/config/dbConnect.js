const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});

pool.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err.stack);
        process.exit(1);
    } else {
        console.log("Connected to PostgreSQL database.");
    }
});

module.exports = pool;
