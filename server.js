import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors';
import jwt from 'jsonwebtoken'; // Import jsonwebtoken for generating tokens

const app = express();
const port = 3001;
const JWT_SECRET = 'your-secret-key'; // Replace with a secure key

app.use(cors());
app.use(express.json());

const initDb = async () => {
  const db = await open({
    filename: './mydatabase.db',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS User (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      firstname TEXT,
      middlename TEXT,
      lastname TEXT,
      username TEXT,
      gender TEXT,
      birthdate TEXT,
      address TEXT,
      password TEXT
    )
  `);

  return db;
};

const dbPromise = initDb();

app.post('/User', async (req, res) => {
  const db = await dbPromise;
  const { email, firstname, middlename, lastname, username, gender, birthdate, address, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await db.get("SELECT * FROM User WHERE email = ?", [email]);

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Insert new user if not exists
    await db.run(
      `INSERT INTO User (email, firstname, middlename, lastname, username, gender, birthdate, address, password) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [email, firstname, middlename, lastname, username, gender, birthdate, address, password]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT') {
      return res.status(400).json({ error: 'Unique constraint failed' });
    }
    res.status(500).json({ error: err.message });
  }
});

app.post('/login', async (req, res) => {
  const db = await dbPromise;
  const { email, password } = req.body;

  try {
    // Retrieve the user from the database by email
    const user = await db.get("SELECT * FROM User WHERE email = ?", [email]);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the password with the plain text password stored in the database
    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ user_id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });

    // Return success response with the token
    res.status(200).json({
      success: true,
      message: 'Login successful',
      access_token: token
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
