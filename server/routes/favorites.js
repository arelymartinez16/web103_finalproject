import express from 'express'
import FavoritesController from '../controllers/favorites.js'

const router = express.Router()

router.get('/', FavoritesController.getFavoritesRooms)
router.get('/:id', FavoritesController.getFavoriteRoom)
router.post('/', FavoritesController.createFavoriteRoom )
router.delete('/:id', FavoritesController.deleteFavoriteRoom)
router.post('/toggle', FavoritesController.toggleFavoriteRoom);
router.get('/check/:id', FavoritesController.getFavoriteRoom);



export default router
