import { pool } from '../config/database.js';
 // Import your Postgres database connection

// Create the `users` table if it doesn't exist
const createUsersTableQuery = `
CREATE TABLE IF NOT EXISTS users (
    user_id serial PRIMARY KEY,
    githubid int NOT NULL,
    username varchar(200) NOT NULL,
    avatarurl varchar(500),
    accesstoken varchar(500) NOT NULL
);`

// Create the `users_trips` table if it doesn't exist
const createUsersRoomsTableQuery = `
CREATE TABLE IF NOT EXISTS users_rooms (
    user_id serial PRIMARY KEY,
    room_id int NOT NULL,
    username text NOT NULL,
    FOREIGN KEY (room_id) REFERENCES rooms(room_id)
);`

// Execute table creation queries
pool.query(createUsersTableQuery, (error, res) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log('✅ users table created successfully!');
});

pool.query(createUsersRoomsTableQuery, (error, res) => {
    if (error) {
        console.log(error);
        return;
    }
    console.log('✅ users_rooms table created successfully!');
});

// Controller to add a user to a trip
export const createRoomUser = async (req, res) => {
    try {
        const room_id = parseInt(req.params.room_id);
        const { username } = req.body;

        const results = await pool.query(
            `INSERT INTO users_rooms (room_id, username)
             VALUES($1, $2)
             RETURNING *`,
            [room_id, username]
        );

        res.status(200).json(results.rows[0]);
        console.log('🆕 added user to room');
    } catch (error) {
        res.status(409).json({ error: error.message });
        console.log('Error:', error.message);
    }
};

// Controller to get all users for a specific trip
export const getRoomUsers = async (req, res) => {
    try {
        const room_id = parseInt(req.params.room_id);

        const results = await pool.query(
            `SELECT * FROM users_rooms WHERE room_id = $1`,
            [room_id]
        );

        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
        console.log('Error:', error.message);
    }
};

// Controller to get all rooms associated with a specific user
export const getUserRooms = async (req, res) => {
    try {
        const username = req.params.username;

        const results = await pool.query(
            `SELECT t.* FROM users_rooms ut
             JOIN rooms t ON ut.room_id = t.room_id
             WHERE ut.username = $1`,
            [username]
        );

        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
        console.log('🚫 unable to GET user rooms - Error:', error.message);
    }
};
