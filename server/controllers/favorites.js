import { pool } from '../config/database.js'

const createFavoriteRoom = async (req, res) => {
  try {
    const { user_id, room_id } = req.body

    // Check if the room is already in the favorite list
    const existingRecord = await pool.query(
      'SELECT * FROM favorites WHERE user_id = $1 AND room_id = $2',
      [user_id, room_id]
    );

    if (existingRecord.rows.length > 0) {
      res.status(409).json({ message: 'Room is already in the favorite List' });
      return;
    }

    // If not, add the room to the favorites
    const results = await pool.query(
      'INSERT INTO favorites (user_id, room_id) VALUES ($1, $2) RETURNING *',
      [user_id, room_id]
    );

    res.status(201).json(results.rows[0])
  } catch (error) {
    res.status(409).json({ error: error.message })
  }
}

const getFavoritesRooms = async (req, res) => {
  try {
    const results = await pool.query(`
      SELECT rooms.* 
      FROM favorites
      INNER JOIN rooms ON favorites.room_id = rooms.room_id 
      ORDER BY rooms.room_id ASC
    `);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const getFavoriteRoom = async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const results = await pool.query('SELECT * FROM favorites WHERE room_id = $1', [id]);
  

      if (results.rows.length === 0) {
        return res.status(200).json({ isFavorite: false });
      }
  
      return res.status(200).json({ isFavorite: true });
    } catch (error) {
      res.status(409).json({ error: error.message });
    }
  };
  

const toggleFavoriteRoom = async (req, res) => {
    try {
      const { user_id, room_id } = req.body;
  
    
      const existingRecord = await pool.query(
        'SELECT * FROM favorites WHERE user_id = $1 AND room_id = $2',
        [user_id, room_id]
      );
  
      if (existingRecord.rows.length > 0) {
        
        await pool.query('DELETE FROM favorites WHERE user_id = $1 AND room_id = $2', [user_id, room_id]);
        return res.status(200).json({ message: 'Room removed from favorites' });
      } else {
        
        await pool.query(
          'INSERT INTO favorites (user_id, room_id) VALUES ($1, $2) RETURNING *',
          [user_id, room_id]
        );
        return res.status(201).json({ message: 'Room added to favorites' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

const deleteFavoriteRoom = async (req, res) => {
  try {
    const room_id = parseInt(req.body.room_id)
    const user_id = parseInt(req.body.user_id)


    const results = await pool.query('DELETE FROM favorites WHERE (user_id, room_id) = ($1, $2)', [user_id, room_id])
    res.status(200).json(results.rows[0])
  }
  catch (error) {
    res.status(409).json({ error: error.message })
  }
}






export default {
  createFavoriteRoom,
  getFavoritesRooms,
  getFavoriteRoom,
  deleteFavoriteRoom,
  toggleFavoriteRoom
}