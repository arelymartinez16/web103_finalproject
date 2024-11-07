import express from 'express'
import RoomsController from '../controllers/rooms.js'
const router = express.Router()
router.get('/', RoomsController.getRooms)
router.get('/:id', RoomsController.getRoom)
router.post('/', RoomsController.createRoom)
router.delete('/:id', RoomsController.deleteRoom)
router.patch('/:id', RoomsController.updateRoom)
export default router