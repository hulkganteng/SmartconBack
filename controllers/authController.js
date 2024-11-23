const db = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    city,
    province,
    country,
    age,
  } = req.body;

  if (!first_name || !last_name || !email || !password || !city || !province || !country || !age) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    `INSERT INTO users 
    (first_name, last_name, email, password, city, province, country, age, role) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      first_name,
      last_name,
      email,
      hashedPassword,
      city,
      province,
      country,
      age,
      "user",
    ],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({ message: "User registered successfully!" });
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, users) => {
    if (err || users.length === 0) return res.status(400).json({ message: "Invalid email or password" });

    const user = users[0];
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  });
};