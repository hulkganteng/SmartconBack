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
  if (!token) {
    console.error("No token provided");
    return next(new error("Authentication error"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("JWT verification failed:", err);
      return next(new error("Authentication error"));
    }

    const email = decoded.email; // Ambil email dari payload JWT
    if (!email) {
      console.error("Token does not contain email");
      return next(new error("Authentication error"));
    }

    // Query ke database untuk mendapatkan user_id berdasarkan email
    db.query("SELECT user_id FROM users WHERE email = ?", [email], (err, results) => {
      if (err) {
        console.error("Database query failed:", err);
        return next(new error("Database error"));
      }

      if (results.length === 0) {
        console.error("User not found for the given email");
        return next(new error("Authentication error"));
      }

      const user_id = results[0].user_id; // Ambil user_id dari hasil query
      console.log("Authenticated user_id from DB:", user_id);
      socket.user = { user_id }; // Simpan user_id di socket
      next();
    });
  });
});



// Event Socket.IO
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Event ketika pengguna bergabung ke room
  socket.on("join_room", ({ room_id }) => {
    if (!room_id) {
      console.error("Room ID is required to join a room.");
      return;
    }
  
    socket.join(room_id); // Bergabung ke room tertentu
    console.log(`User joined room: ${room_id}`);
  
    // Kirim riwayat pesan dari room
    const query = `
  SELECT messages.*, 
         CONCAT(users.first_name, ' ', users.last_name) AS sender_name 
  FROM messages 
  INNER JOIN users ON messages.sender_id = users.user_id 
  WHERE messages.room_id = ? 
  ORDER BY messages.timestamp ASC
`;
  
    db.query(query, [room_id], (err, messages) => {
      if (err) {
        console.error("Failed to fetch chat history:", err);
        return;
      }
      socket.emit("chat_history", messages); // Kirim riwayat pesan ke pengguna
    });
  });
  

  // Event ketika pengguna mengirim pesan
  socket.on("send_message", ({ content, room_id }) => {
    if (!content || !room_id) {
      console.error("Message content and room ID are required.");
      return;
    }
  
    const sender_id = socket.user?.user_id; // Ambil sender_id dari token JWT
  
    if (!sender_id) {
      console.error("Sender ID is null or undefined. Check token verification.");
      return;
    }
  
    // Siapkan data pesan
    const message = {
      sender_id,
      content,
      room_id,
      timestamp: new Date(),
    };
  
    // Simpan pesan ke database
    db.query(
      "INSERT INTO messages (sender_id, room_id, content, timestamp) VALUES (?, ?, ?, NOW())",
      [sender_id, room_id, content],
      (err) => {
        if (err) {
          console.error("Failed to save message to database:", err);
          return;
        }
  
        // Broadcast pesan ke semua klien di room
        io.to(room_id).emit("receive_message", message);
      }
    );
  });

  // Event ketika pengguna terputus
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
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
