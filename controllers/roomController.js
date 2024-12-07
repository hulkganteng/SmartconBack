const Room = require('../models/Room');  // Import model room jika diperlukan
const Message = require('../models/Message'); // Import model message jika diperlukan

// Fungsi untuk mengambil semua room
const getRooms = async (req, res) => {
  try {
    // Ambil semua rooms dari database
    const rooms = await Room.find();
    
    if (rooms.length === 0) {
      // Jika belum ada room, buat room default (Umum)
      const defaultRoom = new Room({ name: 'Umum' });
      await defaultRoom.save();
      return res.status(200).json([defaultRoom]);
    }

    res.status(200).json(rooms); // Mengembalikan semua room yang ada
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ message: "Gagal memuat rooms" });
  }
};

// Fungsi untuk mengambil pesan dalam room
const getMessagesInRoom = async (req, res) => {
  const { roomId } = req.params;
  try {
    // Ambil pesan berdasarkan roomId
    const messages = await Message.find({ roomId });

    res.status(200).json(messages); // Mengembalikan pesan
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Gagal memuat pesan" });
  }
};

// Fungsi untuk menambah pesan baru
const sendMessage = async (req, res) => {
  const { roomId, sender, content } = req.body;
  try {
    const message = new Message({
      roomId,
      sender,
      content,
    });
    
    await message.save();
    
    res.status(201).json(message); // Mengembalikan pesan yang baru dikirim
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ message: "Gagal mengirim pesan" });
  }
};

module.exports = { getRooms, getMessagesInRoom, sendMessage };
