const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const multer = require("multer");  // Tambahkan import multer di sini
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
const diseaseDetectionRoutes = require("./routes/diseaseDetectionRoutes"); 
const historyRoutes = require("./routes/historyRoutes")

const app = express();
const server = http.createServer(app);  // Membuat server HTTP

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",  // Pastikan URL ini benar sesuai dengan frontend
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],  // Sesuaikan header yang digunakan
  },
  transports: ["websocket"],  // Memaksa WebSocket, cocok untuk penggunaan yang lebih stabil
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Membuat folder uploads/detection jika belum ada
const detectionDir = path.join(__dirname, "uploads", "detection");
if (!fs.existsSync(detectionDir)) {
  fs.mkdirSync(detectionDir, { recursive: true });
  console.log(`Folder detection uploads berhasil dibuat: ${detectionDir}`);
}

// Membuat folder uploads jika belum ada
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log(`Folder uploads berhasil dibuat: ${uploadDir}`);
}

// Middleware untuk mengakses folder uploads secara publik
app.use("/uploads", express.static(uploadDir));
app.use("/uploads/detection", express.static(detectionDir));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/forums", forumRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/disease-detection", diseaseDetectionRoutes);
app.use("/api/history",historyRoutes);

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
  console.log("A user connected:", socket.id);

  // Event ketika pengguna bergabung ke room
  socket.on("join_room", ({ username, room }) => {
    socket.join(room);
    console.log(`${username} joined room: ${room}`);

    // Kirim riwayat chat ketika user bergabung
    db.query("SELECT * FROM messages WHERE room_id = ? ORDER BY timestamp ASC", [room], (err, messages) => {
      if (err) {
        console.error("Failed to fetch chat history:", err);
        return;
      }
      socket.emit("chat_history", messages);  // Mengirim riwayat chat ke pengguna yang baru bergabung
    });
  });

  // Event ketika pesan dikirim
  socket.on("send_message", (message) => {
    const { content, sender, room } = message;

    if (content && sender && room) {
      // Simpan pesan ke database
      db.query(
        "INSERT INTO messages (sender_id, content, room_id, timestamp) VALUES (?, ?, ?, NOW())",
        [sender, content, room],
        (err, result) => {
          if (err) {
            console.error("Failed to save message to database:", err);
            return;
          }

          // Kirim pesan ke seluruh anggota room
          io.to(room).emit("receive_message", message);
        }
      );
    }
  });

  // Event ketika pengguna terputus
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
