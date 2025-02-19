// Import the database connection
const pool = require("../config/dbConnect");

// Function to upload image metadata and blob data
const saveImageBlob = async ({ userId, filename, data }) => {
    const query = `
        INSERT INTO images (user_id, filename, data)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const values = [userId, filename, data];
    const result = await pool.query(query, values);
    return result.rows[0];
};

// Function to get images by user ID
const getImagesByUserId = async (userId) => {
    const query = `SELECT id, user_id, filename, upload_date FROM images WHERE user_id = $1;`;
    const values = [userId];
    const result = await pool.query(query, values);
    return result.rows;
};

// Function to get all images (admin view) without blob data
const getAllImages = async () => {
    const query = `SELECT id, user_id, filename, upload_date FROM images;`;
    const result = await pool.query(query);
    return result.rows;
};

// Function to get a single image by ID, including blob data
const getImageById = async (id) => {
    const query = `SELECT * FROM images WHERE id = $1;`;
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
};

// Function to create a new user
const createUser = async ({ username, password, role }) => {
    const query = `
        INSERT INTO users (username, password, role)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;
    const values = [username, password, role];
    const result = await pool.query(query, values);
    return result.rows[0];
};

// Function to find a user by their username
const findUserByUsername = async (username) => {
    const query = `SELECT * FROM users WHERE username = $1;`;
    const values = [username];
    const result = await pool.query(query, values);
    return result.rows[0];
};

// Export all functions
module.exports = {
    createUser,
    findUserByUsername,
    saveImageBlob,
    getImagesByUserId,
    getAllImages,
    getImageById,
};
