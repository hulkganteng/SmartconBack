const express = require('express');
const router = express.Router();
const { getRooms, getMessagesInRoom, sendMessage } = require('../controllers/roomController');

// Route untuk mengambil semua room
router.get('/rooms', getRooms);

// Route untuk mengambil pesan dalam sebuah room
router.get('/rooms/:roomId/messages', getMessagesInRoom);

// Route untuk mengirim pesan ke room tertentu
router.post('/rooms/:roomId/messages', sendMessage);

module.exports = router;
