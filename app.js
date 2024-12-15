const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const multer = require("multer");  // Tambahkan import multer di sini
require("dotenv").config(); // Memuat konfigurasi dari file .env
const http = require("http");  // Import http untuk menjalankan server
const https = require("https");  // Import https untuk menjalankan server HTTPS
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

// **Menambahkan SSL - Sertifikat**
const privateKey = fs.readFileSync("path/to/private-key.pem", "utf8");
const certificate = fs.readFileSync("path/to/certificate.pem", "utf8");
const ca = fs.readFileSync("path/to/ca-cert.pem", "utf8");

const credentials = { key: privateKey, cert: certificate, ca: ca };

// **Membuat Server HTTPS**
const server = https.createServer(credentials, app);  // Menggunakan https.createServer dengan sertifikat SSL

const io = socketIo(server, {
  cors: {
    origin: "https://smartconweb.my.id",  // Pastikan URL ini benar sesuai dengan frontend
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],  // Sesuaikan header yang digunakan
  },
  transports: ["websocket"],  // Memaksa WebSocket, cocok untuk penggunaan yang lebih stabil
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Middleware untuk mengakses folder uploads secara publik
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads/detection', express.static(path.join(__dirname, 'uploads/detection')));
app.use('/uploads/profiles', express.static(path.join(__dirname, 'uploads/profiles')));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/forums", forumRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/disease-detection", diseaseDetectionRoutes);
app.use("/api/history", historyRoutes);

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

    // Ambil nama pengguna dari database
    db.query("SELECT CONCAT(first_name, ' ', last_name) AS sender_name FROM users WHERE user_id = ?", [sender_id], (err, results) => {
      if (err || results.length === 0) {
        console.error("Error fetching sender name:", err);
        return;
      }

      const sender_name = results[0].sender_name;

      // Siapkan data pesan
      const message = {
        sender_id,
        sender_name,
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
  });

  // Event ketika pengguna terputus
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Default Route for Root
app.get("/api", (req, res) => {
  res.send("Welcome to Smartcon Backend API");
});

// Handle 404 Errors (Unknown Routes)
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

// **Menjalankan server HTTPS**
server.listen(3000, () => {
  console.log("Server berjalan di https://localhost:3000");
});
