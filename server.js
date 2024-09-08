import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors';

const app = express();
const port = 3001;

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
      email TEXT UNIQUE
    )
  `);

  return db;
};

const dbPromise = initDb();

app.post('/User', async (req, res) => {
  const db = await dbPromise;
  const { id, email } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await db.get("SELECT * FROM User WHERE email = ?", [email]);

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Insert new user if not exists
    await db.run("INSERT INTO User (id, email) VALUES (?, ?)", [id, email]);
    res.status(201).json({ id, email });
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT') {
      return res.status(400).json({ error: 'Unique constraint failed' });
    }
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
