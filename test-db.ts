import Database from "better-sqlite3";
try {
  const db = new Database(":memory:");
  console.log("Database initialized successfully");
  db.close();
} catch (e) {
  console.error("Database initialization failed:", e);
}
