import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("finance_diagnosis.db");

// Initialize DB
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    license_limit INTEGER DEFAULT 5,
    diagnoses_count INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS diagnoses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    company_name TEXT,
    sector TEXT,
    activity TEXT,
    company_size TEXT,
    contact_name TEXT,
    contact_email TEXT,
    year_constituted INTEGER,
    responsible TEXT,
    period_type TEXT,
    data TEXT, -- JSON string of financial data
    report TEXT, -- JSON string of AI report
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
`);

// Seed default users
const insertUser = db.prepare("INSERT OR IGNORE INTO users (username, password, license_limit) VALUES (?, ?, ?)");
insertUser.run("admin", "admin123", 5);
insertUser.run("workfix", "workfix2026", 5);
insertUser.run("administrador123", "workfix2026", 5);

// Ensure all existing users have the 5 limit as requested
db.prepare("UPDATE users SET license_limit = 5").run();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Auth Middleware
  const auth = (req: any, res: any, next: any) => {
    const userId = req.headers["x-user-id"];
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    const parsedId = parseInt(userId as string);
    if (isNaN(parsedId)) return res.status(401).json({ error: "Invalid User ID" });
    req.userId = parsedId;
    next();
  };

  // API Routes
  app.get("/api/users/:id", auth, (req: any, res) => {
    if (req.userId !== parseInt(req.params.id)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    const user = db.prepare("SELECT id, username, license_limit, diagnoses_count FROM users WHERE id = ?").get(req.userId) as any;
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  });

  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE username = ? AND password = ?").get(username, password) as any;
    if (user) {
      res.json({ id: user.id, username: user.username, license_limit: user.license_limit, diagnoses_count: user.diagnoses_count });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  app.get("/api/diagnoses", auth, (req: any, res) => {
    const diagnoses = db.prepare("SELECT * FROM diagnoses WHERE user_id = ? ORDER BY created_at DESC").all(req.userId);
    res.json(diagnoses);
  });

  app.post("/api/diagnoses", auth, (req: any, res) => {
    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(req.userId) as any;
    if (user.diagnoses_count >= user.license_limit) {
      return res.status(403).json({ error: "License limit reached" });
    }

    const { company_name, sector, activity, company_size, contact_name, contact_email, year_constituted, responsible, period_type, data, report } = req.body;
    const result = db.prepare(`
      INSERT INTO diagnoses (user_id, company_name, sector, activity, company_size, contact_name, contact_email, year_constituted, responsible, period_type, data, report)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(req.userId, company_name, sector, activity, company_size, contact_name, contact_email, year_constituted, responsible, period_type, JSON.stringify(data), JSON.stringify(report));

    db.prepare("UPDATE users SET diagnoses_count = diagnoses_count + 1 WHERE id = ?").run(req.userId);

    res.json({ id: result.lastInsertRowid });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });

  // Error handling middleware
  app.use((err: any, req: any, res: any, next: any) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error", message: err.message });
  });
}

startServer();
