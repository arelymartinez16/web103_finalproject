import express from 'express';
import { createRoomUser, getRoomUsers, getUserRooms } from '../controllers/users_rooms.js';

const router = express.Router();

router.post('/create/:room_id', createRoomUser); // Add user to room
router.get('/users/:room_id', getRoomUsers); // Get all users for a room
router.get('/rooms/:username', getUserRooms); // Get all rooms for a room

export default router;
