import { pool } from "../config/database.js"


// const getUser = async (req, res) => {
//     try {
//         const user_id = parseInt(req.params.user_id)
//         const results = await pool.query('SELECT * FROM users WHERE user_id = $1', [user_id])
//         res.status(200).json(results.rows[0])
//     } catch (err) {
//         res.status(409).json({ error: err.message })
//     }
// }

const getProfile = async (req, res) => {
    try {
        const user_id = parseInt(req.params.id)
        const results = await pool.query('SELECT * FROM profile WHERE user_id = $1', [user_id])
        res.status(200).json(results.rows[0])
    } catch (err) {
        res.status(409).json({ error: err.message })
    }
}

const updateProfile = async (req, res) => {
    try {
        const { first_name, last_name, phone_number, address } = req.body
        const user_id = parseInt(req.params.id)
        const results = await pool.query(
            `
                UPDATE profile
                SET first_name = $1, last_name = $2, phone_number = $3, address = $4
                WHERE user_id = $5
            `,
            [first_name, last_name, phone_number, address, user_id]
        )
        res.status(200).json(results.rows)
    } catch (err) {
        res.status(409).json({ error: err.message })
    }
}

export default {
    getProfile,
    updateProfile
}