import { pool } from './database.js';
import './dotenv.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
// Functions to drop tables
const dropFavoritesTable = async () => {
    try {
        await pool.query(`DROP TABLE IF EXISTS favorites CASCADE;`);
        console.log(':wastebasket: favorites table dropped successfully');
    } catch (err) {
        console.error(':warning: error dropping favorites table', err);
    }
};
const dropRoomsTable = async () => {
    try {
        await pool.query(`DROP TABLE IF EXISTS rooms CASCADE;`);
        console.log(':wastebasket: rooms table dropped successfully');
    } catch (err) {
        console.error(':warning: error dropping rooms table', err);
    }
};
const dropProfileTable = async () => {
    try {
        await pool.query(`DROP TABLE IF EXISTS profile CASCADE;`);
        console.log(':wastebasket: profile table dropped successfully');
    } catch (err) {
        console.error(':warning: error dropping profile table', err);
    }
};
const dropUsersTable = async () => {
    try {
        await pool.query(`DROP TABLE IF EXISTS users CASCADE;`);
        console.log(':wastebasket: users table dropped successfully');
    } catch (err) {
        console.error(':warning: error dropping users table', err);
    }
};
// Set up the path for the data.json file
const currentPath = fileURLToPath(import.meta.url);
const roomsFile = fs.readFileSync(path.join(dirname(currentPath), '../config/data/data.json'));
const roomsData = JSON.parse(roomsFile);
// Functions to create tables
const createUsersTable = async () => {
    const createUsersTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            user_id serial PRIMARY KEY,
            githubid integer NOT NULL,
            username varchar(100) NOT NULL,
            avatarurl varchar(500) NOT NULL,
            accesstoken varchar(500) NOT NULL
        );
    `;
    try {
        await pool.query(createUsersTableQuery);
        console.log(':tada: users table created successfully');
    } catch (err) {
        console.error(':warning: error creating users table', err);
    }
};
const createProfileTable = async () => {
    const createProfileTableQuery = `
        CREATE TABLE IF NOT EXISTS profile (
            profile_id serial PRIMARY KEY,
            user_id int NOT NULL UNIQUE,
            first_name varchar(100),
            last_name varchar(100),
            phone_number varchar(20),
            address varchar(255),
            FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
        );
    `;
    try {
        await pool.query(createProfileTableQuery);
        console.log(':tada: profile table created successfully');
    } catch (err) {
        console.error(':warning: error creating profile table', err);
    }
};
const createRoomsTable = async () => {
    const createRoomsTableQuery = `
        CREATE TABLE IF NOT EXISTS rooms (
            room_id serial PRIMARY KEY,
            description varchar(500) NOT NULL,
            address varchar(250) NOT NULL,
            amenities varchar(500) NOT NULL,
            leaseTerm varchar(100),
            monthlyRent decimal NOT NULL,
            available_date date NOT NULL,
            type varchar(100) NOT NULL,
            location varchar(200) NOT NULL,
            status varchar(50) NOT NULL,
            img_url text NOT NULL
        );
    `;
    try {
        await pool.query(createRoomsTableQuery);
        console.log(':tada: rooms table created successfully');
    } catch (err) {
        console.error(':warning: error creating rooms table', err);
    }
};
const createFavoritesTable = async () => {
    const createFavoritesTableQuery = `
        CREATE TABLE IF NOT EXISTS favorites (
            favorite_id serial PRIMARY KEY,
            user_id int NOT NULL,
            room_id int NOT NULL
        );
    `;
    try {
        await pool.query(createFavoritesTableQuery);
        console.log(':tada: favorites table created successfully');
    } catch (err) {
        console.error(':warning: error creating favorites table', err);
    }
};
const seedRoomsTable = async () => {
    const insertRoomsQuery = `
        INSERT INTO rooms (description, address, amenities, leaseTerm, monthlyRent, available_date, type, location, status, img_url)
        VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10);
    `;
    try {
        for (const room of roomsData) {
            await pool.query(insertRoomsQuery, [
                room.description,
                room.address,
                room.amenities,
                room.leaseTerm,
                room.monthlyRent,
                room.available_date,
                room.type,
                room.location,
                room.status,
                room.img_url
            ]);
        }
        console.log(':tada: rooms data seeded successfully');
    } catch (err) {
        console.error(':warning: error seeding rooms table', err);
    }
};
// Ensure tables are created in the correct order
const initializeDatabase = async () => {
    await dropFavoritesTable();
    await dropRoomsTable();
    await dropProfileTable();
    await dropUsersTable();
    await createUsersTable();
    await createProfileTable();
    await createRoomsTable(); // Create rooms table after users and profile
    await seedRoomsTable();
    await createFavoritesTable(); // Create favorites table last
};
initializeDatabase();