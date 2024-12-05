const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
require("dotenv").config(); // Memuat konfigurasi dari file .env
const http = require("http");  // Import http untuk menjalankan server
const socketIo = require("socket.io");  // Import socket.io
const jwt = require("jsonwebtoken");
const db = require("./models/db"); // Pastikan db sudah terhubung dengan database

// Import Routes
const authRoutes = require("./routes/authRoutes");
const articleRoutes = require("./routes/articleRoutes");
const forumRoutes = require("./routes/forumRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();
const server = http.createServer(app);  // Membuat server HTTP


const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",  // Sesuaikan dengan frontend Anda
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
  transports: ["websocket"],  // Memaksa WebSocket tanpa fallback ke XHR
});


// Middleware
app.use(cors());
app.use(bodyParser.json());

// Membuat folder uploads jika belum ada
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log(`Folder uploads berhasil dibuat: ${uploadDir}`);
}

// Middleware untuk mengakses folder uploads secara publik
app.use("/uploads", express.static(uploadDir));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/forums", forumRoutes);
app.use("/api/chats", chatRoutes);


// Socket.IO Configuration with Authentication
// app.js



// Socket.IO Configuration with Authentication
io.use((socket, next) => {
  const token = socket.handshake.query.token; // Ambil token dari query parameter
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return next(new Error("Authentication error"));
      }
      socket.user = decoded; // Menyimpan data user di socket
      next();
    });
  } else {
    return next(new Error("Authentication error"));
  }
});

// Ketika pengguna berhasil terhubung
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id, socket.user);

  // Kirim data user ke frontend setelah koneksi berhasil
  socket.emit("user_authenticated", { username: socket.user.username });

  // Ambil roomId dari query parameter saat pengguna bergabung ke room
  const roomId = socket.handshake.query.roomId;
  if (roomId) {
    socket.join(roomId);  // Menghubungkan socket ke room tertentu

    // Mengambil riwayat chat saat pengguna bergabung
    db.query("SELECT * FROM messages WHERE room_id = ? ORDER BY timestamp ASC", [roomId], (err, messages) => {
      if (err) {
        console.error("Failed to fetch chat history:", err);
        return;
      }
      socket.emit("chat_history", messages);  // Kirim riwayat chat ke pengguna yang baru bergabung
    });
  }

  // Event listener untuk pengiriman pesan
  socket.on("send_message", (message) => {
    console.log("Message received:", message);

    const { content, receiverId, roomId } = message;
    const senderId = socket.user.user_id;  // ID pengirim dari socket

    if (!content || !receiverId || !senderId || !roomId) {
      socket.emit("message_error", { message: "Content, sender, receiver, or room is missing" });
      return;
    }

    // Simpan pesan ke database
    db.query(
      "INSERT INTO messages (sender_id, receiver_id, room_id, content, timestamp) VALUES (?, ?, ?, ?, NOW())",
      [senderId, receiverId, roomId, content],
      (err, result) => {
        if (err) {
          console.error("Error saving message to database:", err);
          socket.emit("message_error", { message: "Failed to send message" });
          return;
        }

        // Kirim pesan ke seluruh anggota room
        io.to(roomId).emit("receive_message", {
          sender: socket.user.username,
          content: content,
          roomId: roomId
        });
      }
    );
  });

  // Event listener untuk pengguna yang terputus
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});




// Default Route for Root
app.get("/", (req, res) => {
  res.send("Welcome to Smartcon Backend API");
});

// Handle 404 Errors (Unknown Routes)
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err.stack); // Menampilkan error ke console
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
});

// Start Server (menggunakan server HTTP untuk menambahkan Socket.IO)
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
