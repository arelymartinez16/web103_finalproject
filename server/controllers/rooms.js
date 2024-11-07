import { pool } from '../config/database.js'
const createRoom = async (req, res) => {
    try {
        const { description, address, amenities, leaseTerm, monthlyRent, available_date, type, location, status, img_url } = req.body
        const results = await pool.query(
            `
                INSERT INTO rooms (description, address, amenities, leaseTerm, monthlyRent, available_date, type, location, status, img_url)
                VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                RETURNING *
            `,
            [description, address, amenities, leaseTerm, monthlyRent, available_date, type, location, status, img_url]
        )
        res.status(201).json(results.rows[0])
    } catch (err) {
        res.status(409).json({ error: err.message })
    }
}
const getRooms = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM rooms ORDER BY room_id ASC')
        res.status(200).json(results.rows)
    } catch (err) {
        res.status(409).json({ error: err.message })
    }
}
const getRoom = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM rooms WHERE room_id = $1', [id])
        res.status(200).json(results.rows[0])
    } catch (err) {
        res.status(409).json({ error: err.message })
    }
}
const updateRoom = async (req, res) => {
    try {
        const { description, address, amenities, leaseTerm, monthlyRent, available_date, type, location, status, img_url } = req.body
        const id = parseInt(req.params.id)
        const results = await pool.query(
            `
                UPDATE rooms
                SET description = $1, address = $2, amenities = $3, leaseTerm = $4, monthlyRent = $5, available_date = $6,
                    type = $7, location = $8, status = $9, img_url = $10
                WHERE room_id = $11
            `,
            [description, address, amenities, leaseTerm, monthlyRent, available_date, type, location, status, img_url, id]
        )
        res.status(200).json(results.rows)
    } catch (err) {
        res.status(409).json({ error: err.message })
    }
}
const deleteRoom = async (req, res) => {
    const id = parseInt(req.params.id)
    try {
        const results = await pool.query('DELETE FROM rooms WHERE room_id = $1', [id])
        res.status(200).json(results.rows)
    } catch (err) {
        res.status(409).json({ error: err.message })
    }
}
export default {
    createRoom,
    getRooms,
    getRoom,
    updateRoom,
    deleteRoom
}